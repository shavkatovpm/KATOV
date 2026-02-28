"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import "./card-swap.css";

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customClass?: string }
>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card-swap-card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
  opacity: number;
}

const SLOT_OPACITIES = [1, 0.5, 0.3, 0.2];

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
  opacity: SLOT_OPACITIES[i] ?? 0.4,
});

const placeNow = (
  el: HTMLElement | null,
  slot: Slot,
  skew: number,
) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    opacity: 1,
    force3D: true,
  });
  const h3 = el.querySelector("h3");
  if (h3) gsap.set(h3, { opacity: slot.opacity });
};

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  children: React.ReactNode;
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power2.out",
          durDrop: 0.4,
          durMove: 0.4,
          durReturn: 0.4,
          promoteOverlap: 0.6,
          returnDelay: 0.15,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const delayedRef = useRef<gsap.core.Tween | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mobile browsers throttle rAF during scroll, freezing GSAP animations.
    // Solution: stop GSAP's built-in rAF loop and drive it with setTimeout,
    // which is NOT throttled during scroll.
    gsap.ticker.sleep();
    let tickTimer: ReturnType<typeof setTimeout>;
    let lastTime = Date.now();
    const manualTick = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      gsap.updateRoot(gsap.ticker.time + delta);
      tickTimer = setTimeout(manualTick, 16); // ~60fps
    };
    manualTick();

    gsap.ticker.lagSmoothing(500, 33);

    const total = refs.length;

    refs.forEach((r, i) =>
      placeNow(
        r.current,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount,
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      // If previous animation is still running, finish it instantly
      if (tlRef.current && tlRef.current.isActive()) {
        tlRef.current.progress(1).kill();
      }

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline({
        onComplete: () => {
          // Schedule next swap via GSAP ticker (syncs with rAF, pauses with it)
          delayedRef.current = gsap.delayedCall(delay / 1000, swap);
        },
      });
      tlRef.current = tl;

      tl.to(elFront, {
        x: "+=550",
        y: "-=30",
        opacity: 1,
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.set(elFront, { zIndex: -1 });

      tl.addLabel("promote", `-=${config.durDrop * 0.3}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        const h3 = el.querySelector("h3");
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            opacity: 1,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
        if (h3) {
          tl.to(h3, { opacity: slot.opacity, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
        }
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `${config.durDrop}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          opacity: 1,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );
      const frontH3 = elFront.querySelector("h3");
      if (frontH3) {
        tl.to(frontH3, { opacity: backSlot.opacity, duration: config.durReturn, ease: config.ease }, "return");
      }

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Start first swap after short delay
    delayedRef.current = gsap.delayedCall(0.5, swap);

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return;
      const pause = () => {
        tlRef.current?.pause();
        delayedRef.current?.pause();
      };
      const resume = () => {
        tlRef.current?.resume();
        delayedRef.current?.resume();
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        delayedRef.current?.kill();
        tlRef.current?.kill();
        clearTimeout(tickTimer);
        gsap.ticker.wake();
      };
    }

    return () => {
      delayedRef.current?.kill();
      tlRef.current?.kill();
      clearTimeout(tickTimer);
      gsap.ticker.wake();
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    config,
    refs,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child.props as Record<string, unknown>).style as Record<string, unknown> ?? {}) },
          onClick: (e: React.MouseEvent) => {
            ((child.props as Record<string, unknown>).onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="card-swap-container"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
