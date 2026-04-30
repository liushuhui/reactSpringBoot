import { lazy } from "react";

const Demo = lazy(() => import("@/pages/Three/Demo"));
const PerspectiveCamera = lazy(() => import("@/pages/Three/PerspectiveCamera"));
const OrthographicCamera = lazy(() => import("@/pages/Three/OrthographicCamera"));
const LightCamera = lazy(() => import("@/pages/Three/LightCamera"));
const ParticlesCamera = lazy(() => import("@/pages/Three/ParticlesCamera"));
const RaycasterCamera = lazy(() => import("@/pages/Three/RaycasterCamera"));
const FontLoaderCamera = lazy(() => import("@/pages/Three/FontLoaderCamera"));
const ShdowCamera = lazy(() => import("@/pages/Three/ShdowCamera"));
const EffectComposerCamera = lazy(() => import("@/pages/Three/EffectComposerCamera"));
const Volumetric = lazy(() => import("@/pages/Three/Volumetric"));
const Shader = lazy(() => import("@/pages/Three/Shader"));
const OutlineEffect = lazy(() => import("@/pages/Three/OutlineEffect"));
const PBR = lazy(() => import("@/pages/Three/PBR"));
const GSAP = lazy(() => import("@/pages/Three/GSAP"));

export default {
    path: "/three",
    children: [
        {
            path: "demo",
            element: <Demo />

        },
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
        {
            path: "volumetric",
            element: <Volumetric />
        },
        {
            path: "shader",
            element: <Shader />
        },
        {
            path: "outline",
            element: <OutlineEffect />
        },
        {
            path: "pbr",
            element: <PBR />
        },
        {
            path: "gsap",
            element: <GSAP />
        }
    ]
};