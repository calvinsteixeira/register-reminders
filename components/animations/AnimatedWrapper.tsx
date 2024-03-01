'use client'

import React, { ReactElement } from "react";
import { Fade, Slide, Reveal, Bounce, AttentionSeeker } from "react-awesome-reveal";
import { FadeProps, SlideProps, RevealProps, BounceProps, AttentionSeekerProps } from "react-awesome-reveal";

type Props = {
  children: ReactElement;
  animationType: "fade" | "slide" | "reveal" | "bounce" | "attentionSeeker";
  fadeProps?: FadeProps;
  slideProps?: SlideProps;
  revealProps?: RevealProps;
  bounceProps?: BounceProps; 
  attentionSeekerProps?: AttentionSeekerProps 
};

export default function AnimatedWrapper({
  children,
  animationType,
  fadeProps,
  slideProps,
  revealProps,
  bounceProps,
  attentionSeekerProps
}: Props) {
  return (
    <>
      {animationType == "fade" && <Fade {...fadeProps}>{children}</Fade>}
      {animationType == "slide" && <Slide {...slideProps}>{children}</Slide>}
      {animationType == "reveal" && (
        <Reveal {...revealProps}>{children}</Reveal>
      )}
      {animationType == "bounce" && <Bounce {...bounceProps}>{children}</Bounce>}
      {animationType == "attentionSeeker" && <AttentionSeeker {...attentionSeekerProps}>{children}</AttentionSeeker>}
    </>
  );
}