import { lazy } from "react";

const PerspectiveCamera = lazy(() => import("@/pages/Three/PerspectiveCamera"));
const OrthographicCamera = lazy(() => import("@/pages/Three/OrthographicCamera"));
const LightCamera = lazy(() => import("@/pages/Three/LightCamera"));
const ParticlesCamera = lazy(() => import("@/pages/Three/ParticlesCamera"));
const RaycasterCamera = lazy(() => import("@/pages/Three/RaycasterCamera"));
const FontLoaderCamera = lazy(() => import("@/pages/Three/FontLoaderCamera"));
const ShdowCamera = lazy(() => import("@/pages/Three/ShdowCamera"));
const EffectComposerCamera = lazy(() => import("@/pages/Three/EffectComposerCamera"));

export default {
    path: "/three",
    children: [
        {
            path: "one",
            element: <PerspectiveCamera />
        },
        {
            path: "two",
            element: <OrthographicCamera />
        },
        {
            path: "three",
            element: <LightCamera />
        },
        {
            path: "four",
            element: <ParticlesCamera />
        },
        {
            path: "five",
            element: <RaycasterCamera />
        },
        {
            path: "six",
            element: <FontLoaderCamera />
        },
        {
            path: "seven",
            element: <ShdowCamera />
        },
        {
            path: "eight",
            element: <EffectComposerCamera />
        },
    ]
};