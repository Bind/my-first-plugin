import { SpriteRenderer, WebGLManager } from "@darkforest_eth/renderer";
import { Artifact, ArtifactRarity, ArtifactType, Biome } from "@darkforest_eth/types";
export declare const artifactColM = 32;
export declare const artifactColW: number;
export declare const aDexCanvasW: number;
export declare const aDexCanvasH: number;
export declare const aListCanvasW = 48;
export declare const aListCanvasH = 400;
export declare class ArtifactRenderer extends WebGLManager {
    frameRequestId: number;
    spriteRenderer: SpriteRenderer;
    visible: boolean;
    artifacts: Artifact[];
    isDex: boolean;
    scroll: number;
    constructor(canvas: HTMLCanvasElement, isDex?: boolean);
    setIsDex(isDex: boolean): void;
    setScroll(scroll: number): void;
    setVisible(visible: boolean): void;
    setArtifacts(artifacts: Artifact[]): void;
    queueRarityColumn(rarity: ArtifactRarity, startX: number): void;
    containsArtifact(biome: Biome, rarity: ArtifactRarity, type: ArtifactType): boolean;
    queueArtifactColumn(type: ArtifactType, rarity: ArtifactRarity, startX: number): void;
    drawDex(): void;
    drawList(): void;
    draw(): void;
    loop(): void;
    destroy(): void;
}
