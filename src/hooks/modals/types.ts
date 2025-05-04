export type TModal = {
    id: number;
    component: TModalComponent;
    isRemoving: boolean;
    mountDelay: number;
    dismountDelay: number;
}
export type TModals = Record<string, TModal>;
export type TModalComponent = React.ReactElement;