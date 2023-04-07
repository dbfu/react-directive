export interface Handle {
  create?: (value: any, props: any) => boolean | undefined | void;
  mounted?: (ref: any, value: any, props: any) => void;
  show?: (ref: any, value: any, props: any) => void;
  hidden?: (ref: any, value: any, props: any) => void;
}
export const directiveMap: Map<string, any>;
export const directive: (name: string, handle: Handle) => void