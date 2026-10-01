import { UEAPEvent } from "../core/event-schema";

export interface SourceAdapter<TSource> {
  readonly id: string;
  readonly version: string;
  toUEAPEvent(source: TSource): UEAPEvent;
}
