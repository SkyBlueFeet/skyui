declare const _default: {
    name: string;
    props: {
        label: StringConstructor;
        width: NumberConstructor;
        className: StringConstructor;
        field: StringConstructor;
        sorter: (FunctionConstructor | StringConstructor | BooleanConstructor)[];
        selectable: BooleanConstructor;
        filters: ArrayConstructor;
        onFilter: FunctionConstructor;
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(): {
        column: {};
    };
    created(): void;
    mounted(): void;
    render(h: any): any;
};
export default _default;
