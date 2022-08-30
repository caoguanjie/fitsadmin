import type Node from 'element-plus/es/components/tree/src/model/node';
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: null;
        required: true;
        default: string;
    };
}, {
    state: {
        selectedValue: string;
        filterText: string;
    };
    selectedValue: import("vue").Ref<string>;
    filterText: import("vue").Ref<string>;
    treeRef: import("vue").Ref<any>;
    selectInput: import("vue").Ref<any>;
    emit: (event: "update:modelValue", ...args: any[]) => void;
    props: {
        modelValue: any;
    };
    defaultProps: {
        class: (data: TreeNodeData, node: Node) => "is-leaf" | null;
        label: string;
        children: string;
    };
    initValue: (val: any) => void;
    customNodeClass: (data: TreeNodeData, node: Node) => "is-leaf" | null;
    VisibleChange: () => void;
    filterNode: (value: string, data: TreeNodeData, node: Node) => any;
    filterMethod: (value: string) => void;
    nodeClick: (node: TreeNodeData, option: Node, event: any) => void;
    ElTree: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
        data: {
            type: ArrayConstructor;
            default: () => never[];
        };
        emptyText: {
            type: StringConstructor;
        };
        renderAfterExpand: {
            type: BooleanConstructor;
            default: boolean;
        };
        nodeKey: StringConstructor;
        checkStrictly: BooleanConstructor;
        defaultExpandAll: BooleanConstructor;
        expandOnClickNode: {
            type: BooleanConstructor;
            default: boolean;
        };
        checkOnClickNode: BooleanConstructor;
        checkDescendants: {
            type: BooleanConstructor;
            default: boolean;
        };
        autoExpandParent: {
            type: BooleanConstructor;
            default: boolean;
        };
        defaultCheckedKeys: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeKey[]>;
        defaultExpandedKeys: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeKey[]>;
        currentNodeKey: import("vue").PropType<string | number>;
        renderContent: FunctionConstructor;
        showCheckbox: {
            type: BooleanConstructor;
            default: boolean;
        };
        draggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        allowDrag: FunctionConstructor;
        allowDrop: FunctionConstructor;
        props: {
            type: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeOptionProps>;
            default: () => {
                children: string;
                label: string;
                disabled: string;
            };
        };
        lazy: {
            type: BooleanConstructor;
            default: boolean;
        };
        highlightCurrent: BooleanConstructor;
        load: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").LoadFunction>;
        filterNodeMethod: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").FilterNodeMethodFunction>;
        accordion: BooleanConstructor;
        indent: {
            type: NumberConstructor;
            default: number;
        };
        icon: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
    }, {
        ns: {
            namespace: import("vue").ComputedRef<string>;
            b: (blockSuffix?: string | undefined) => string;
            e: (element?: string | undefined) => string;
            m: (modifier?: string | undefined) => string;
            be: (blockSuffix?: string | undefined, element?: string | undefined) => string;
            em: (element?: string | undefined, modifier?: string | undefined) => string;
            bm: (blockSuffix?: string | undefined, modifier?: string | undefined) => string;
            bem: (blockSuffix?: string | undefined, element?: string | undefined, modifier?: string | undefined) => string;
            is: {
                (name: string, state: boolean | undefined): string;
                (name: string): string;
            };
            cssVar: (object: Record<string, string>) => Record<string, string>;
            cssVarName: (name: string) => string;
            cssVarBlock: (object: Record<string, string>) => Record<string, string>;
            cssVarBlockName: (name: string) => string;
        };
        store: import("vue").Ref<{
            currentNode: {
                id: number;
                text: string;
                checked: boolean;
                indeterminate: boolean;
                data: TreeNodeData;
                expanded: boolean;
                parent: any;
                visible: boolean;
                isCurrent: boolean;
                store: any;
                isLeafByUser: boolean;
                isLeaf: boolean;
                canFocus: boolean;
                level: number;
                loaded: boolean;
                childNodes: any[];
                loading: boolean;
                initialize: () => void;
                setData: (data: TreeNodeData) => void;
                readonly label: string;
                readonly key: import("element-plus/es/components/tree/src/tree.type").TreeKey;
                readonly disabled: boolean;
                readonly nextSibling: any;
                readonly previousSibling: any;
                contains: (target: Node, deep?: boolean | undefined) => boolean;
                remove: () => void;
                insertChild: (child?: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode | undefined, index?: number | undefined, batch?: boolean | undefined) => void;
                insertBefore: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
                insertAfter: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
                removeChild: (child: Node) => void;
                removeChildByData: (data: TreeNodeData) => void;
                expand: (callback?: (() => void) | undefined, expandParent?: boolean | undefined) => void;
                doCreateChildren: (array: TreeNodeData[], defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
                collapse: () => void;
                shouldLoadData: () => boolean;
                updateLeafState: () => void;
                setChecked: (value?: string | boolean | undefined, deep?: boolean | undefined, recursion?: boolean | undefined, passValue?: boolean | undefined) => void;
                getChildren: (forceInit?: boolean | undefined) => TreeNodeData | TreeNodeData[];
                updateChildren: () => void;
                loadData: (callback: (node: Node) => void, defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
            };
            currentNodeKey: import("element-plus/es/components/tree/src/tree.type").TreeKey;
            nodesMap: import("element-plus/es/components/tree/src/tree.type").TreeStoreNodesMap;
            root: {
                id: number;
                text: string;
                checked: boolean;
                indeterminate: boolean;
                data: TreeNodeData;
                expanded: boolean;
                parent: any;
                visible: boolean;
                isCurrent: boolean;
                store: any;
                isLeafByUser: boolean;
                isLeaf: boolean;
                canFocus: boolean;
                level: number;
                loaded: boolean;
                childNodes: any[];
                loading: boolean;
                initialize: () => void;
                setData: (data: TreeNodeData) => void;
                readonly label: string;
                readonly key: import("element-plus/es/components/tree/src/tree.type").TreeKey;
                readonly disabled: boolean;
                readonly nextSibling: any;
                readonly previousSibling: any;
                contains: (target: Node, deep?: boolean | undefined) => boolean;
                remove: () => void;
                insertChild: (child?: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode | undefined, index?: number | undefined, batch?: boolean | undefined) => void;
                insertBefore: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
                insertAfter: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
                removeChild: (child: Node) => void;
                removeChildByData: (data: TreeNodeData) => void;
                expand: (callback?: (() => void) | undefined, expandParent?: boolean | undefined) => void;
                doCreateChildren: (array: TreeNodeData[], defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
                collapse: () => void;
                shouldLoadData: () => boolean;
                updateLeafState: () => void;
                setChecked: (value?: string | boolean | undefined, deep?: boolean | undefined, recursion?: boolean | undefined, passValue?: boolean | undefined) => void;
                getChildren: (forceInit?: boolean | undefined) => TreeNodeData | TreeNodeData[];
                updateChildren: () => void;
                loadData: (callback: (node: Node) => void, defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
            };
            data: TreeNodeData[];
            lazy: boolean;
            load: import("element-plus/es/components/tree/src/tree.type").LoadFunction;
            filterNodeMethod: import("element-plus/es/components/tree/src/tree.type").FilterNodeMethodFunction;
            key: import("element-plus/es/components/tree/src/tree.type").TreeKey;
            defaultCheckedKeys: import("element-plus/es/components/tree/src/tree.type").TreeKey[];
            checkStrictly: boolean;
            defaultExpandedKeys: import("element-plus/es/components/tree/src/tree.type").TreeKey[];
            autoExpandParent: boolean;
            defaultExpandAll: boolean;
            checkDescendants: boolean;
            props: {
                children?: string | undefined;
                label?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
                disabled?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
                isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
                class?: ((data: TreeNodeData, node: Node) => string | {
                    [key: string]: boolean;
                }) | undefined;
            };
            initialize: () => void;
            filter: (value: any) => void;
            setData: (newVal: import("element-plus/es/components/tree/src/tree.type").TreeData) => void;
            getNode: (data: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => Node;
            insertBefore: (data: TreeNodeData, refData: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => void;
            insertAfter: (data: TreeNodeData, refData: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => void;
            remove: (data: TreeNodeData | Node) => void;
            append: (data: TreeNodeData, parentData: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData | Node) => void;
            _initDefaultCheckedNodes: () => void;
            _initDefaultCheckedNode: (node: Node) => void;
            setDefaultCheckedKey: (newVal: import("element-plus/es/components/tree/src/tree.type").TreeKey[]) => void;
            registerNode: (node: Node) => void;
            deregisterNode: (node: Node) => void;
            getCheckedNodes: (leafOnly?: boolean | undefined, includeHalfChecked?: boolean | undefined) => TreeNodeData[];
            getCheckedKeys: (leafOnly?: boolean | undefined) => import("element-plus/es/components/tree/src/tree.type").TreeKey[];
            getHalfCheckedNodes: () => TreeNodeData[];
            getHalfCheckedKeys: () => import("element-plus/es/components/tree/src/tree.type").TreeKey[];
            _getAllNodes: () => Node[];
            updateChildren: (key: import("element-plus/es/components/tree/src/tree.type").TreeKey, data: import("element-plus/es/components/tree/src/tree.type").TreeData) => void;
            _setCheckedKeys: (key: import("element-plus/es/components/tree/src/tree.type").TreeKey, leafOnly: boolean | undefined, checkedKeys: {
                [key: string]: boolean;
            }) => void;
            setCheckedNodes: (array: Node[], leafOnly?: boolean | undefined) => void;
            setCheckedKeys: (keys: import("element-plus/es/components/tree/src/tree.type").TreeKey[], leafOnly?: boolean | undefined) => void;
            setDefaultExpandedKeys: (keys: import("element-plus/es/components/tree/src/tree.type").TreeKey[]) => void;
            setChecked: (data: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
            getCurrentNode: () => Node;
            setCurrentNode: (currentNode: Node) => void;
            setUserCurrentNode: (node: Node, shouldAutoExpandParent?: boolean | undefined) => void;
            setCurrentNodeKey: (key: import("element-plus/es/components/tree/src/tree.type").TreeKey, shouldAutoExpandParent?: boolean | undefined) => void;
        }>;
        root: import("vue").Ref<{
            id: number;
            text: string;
            checked: boolean;
            indeterminate: boolean;
            data: TreeNodeData;
            expanded: boolean;
            parent: any;
            visible: boolean;
            isCurrent: boolean;
            store: any;
            isLeafByUser: boolean;
            isLeaf: boolean;
            canFocus: boolean;
            level: number;
            loaded: boolean;
            childNodes: any[];
            loading: boolean;
            initialize: () => void;
            setData: (data: TreeNodeData) => void;
            readonly label: string;
            readonly key: import("element-plus/es/components/tree/src/tree.type").TreeKey;
            readonly disabled: boolean;
            readonly nextSibling: any;
            readonly previousSibling: any;
            contains: (target: Node, deep?: boolean | undefined) => boolean;
            remove: () => void;
            insertChild: (child?: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode | undefined, index?: number | undefined, batch?: boolean | undefined) => void;
            insertBefore: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
            insertAfter: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
            removeChild: (child: Node) => void;
            removeChildByData: (data: TreeNodeData) => void;
            expand: (callback?: (() => void) | undefined, expandParent?: boolean | undefined) => void;
            doCreateChildren: (array: TreeNodeData[], defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
            collapse: () => void;
            shouldLoadData: () => boolean;
            updateLeafState: () => void;
            setChecked: (value?: string | boolean | undefined, deep?: boolean | undefined, recursion?: boolean | undefined, passValue?: boolean | undefined) => void;
            getChildren: (forceInit?: boolean | undefined) => TreeNodeData | TreeNodeData[];
            updateChildren: () => void;
            loadData: (callback: (node: Node) => void, defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
        }>;
        currentNode: import("vue").Ref<{
            id: number;
            text: string;
            checked: boolean;
            indeterminate: boolean;
            data: TreeNodeData;
            expanded: boolean;
            parent: any;
            visible: boolean;
            isCurrent: boolean;
            store: any;
            isLeafByUser: boolean;
            isLeaf: boolean;
            canFocus: boolean;
            level: number;
            loaded: boolean;
            childNodes: any[];
            loading: boolean;
            initialize: () => void;
            setData: (data: TreeNodeData) => void;
            readonly label: string;
            readonly key: import("element-plus/es/components/tree/src/tree.type").TreeKey;
            readonly disabled: boolean;
            readonly nextSibling: any;
            readonly previousSibling: any;
            contains: (target: Node, deep?: boolean | undefined) => boolean;
            remove: () => void;
            insertChild: (child?: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode | undefined, index?: number | undefined, batch?: boolean | undefined) => void;
            insertBefore: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
            insertAfter: (child: Node | import("element-plus/es/components/tree/src/tree.type").FakeNode, ref: Node) => void;
            removeChild: (child: Node) => void;
            removeChildByData: (data: TreeNodeData) => void;
            expand: (callback?: (() => void) | undefined, expandParent?: boolean | undefined) => void;
            doCreateChildren: (array: TreeNodeData[], defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
            collapse: () => void;
            shouldLoadData: () => boolean;
            updateLeafState: () => void;
            setChecked: (value?: string | boolean | undefined, deep?: boolean | undefined, recursion?: boolean | undefined, passValue?: boolean | undefined) => void;
            getChildren: (forceInit?: boolean | undefined) => TreeNodeData | TreeNodeData[];
            updateChildren: () => void;
            loadData: (callback: (node: Node) => void, defaultProps?: import("element-plus/es/components/tree/src/tree.type").TreeNodeLoadedDefaultProps | undefined) => void;
        }>;
        dragState: import("vue").Ref<{
            showDropIndicator: boolean;
            draggingNode: null;
            dropNode: null;
            allowDrop: boolean;
            dropType: null;
        }>;
        el$: import("vue").Ref<import("element-plus/es/utils").Nullable<HTMLElement>>;
        dropIndicator$: import("vue").Ref<import("element-plus/es/utils").Nullable<HTMLElement>>;
        isEmpty: import("vue").ComputedRef<boolean>;
        filter: (value: any) => void;
        getNodeKey: (node: Node) => any;
        getNodePath: (data: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => TreeNodeData[];
        getCheckedNodes: (leafOnly?: boolean | undefined, includeHalfChecked?: boolean | undefined) => TreeNodeData[];
        getCheckedKeys: (leafOnly?: boolean | undefined) => import("element-plus/es/components/tree/src/tree.type").TreeKey[];
        getCurrentNode: () => TreeNodeData;
        getCurrentKey: () => any;
        setCheckedNodes: (nodes: Node[], leafOnly?: boolean | undefined) => void;
        setCheckedKeys: (keys: any, leafOnly?: boolean | undefined) => void;
        setChecked: (data: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
        getHalfCheckedNodes: () => TreeNodeData[];
        getHalfCheckedKeys: () => import("element-plus/es/components/tree/src/tree.type").TreeKey[];
        setCurrentNode: (node: Node, shouldAutoExpandParent?: boolean | undefined) => void;
        setCurrentKey: (key: import("element-plus/es/components/tree/src/tree.type").TreeKey, shouldAutoExpandParent?: boolean | undefined) => void;
        t: import("element-plus").Translator;
        getNode: (data: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => Node;
        remove: (data: TreeNodeData | Node) => void;
        append: (data: TreeNodeData, parentNode: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData | Node) => void;
        insertBefore: (data: TreeNodeData, refNode: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => void;
        insertAfter: (data: TreeNodeData, refNode: import("element-plus/es/components/tree/src/tree.type").TreeKey | TreeNodeData) => void;
        handleNodeExpand: (nodeData: TreeNodeData, node: Node, instance: import("vue").ComponentInternalInstance) => void;
        updateKeyChildren: (key: import("element-plus/es/components/tree/src/tree.type").TreeKey, data: import("element-plus/es/components/tree/src/tree.type").TreeData) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("current-change" | "node-expand" | "check-change" | "node-click" | "node-contextmenu" | "node-collapse" | "check" | "node-drag-start" | "node-drag-end" | "node-drop" | "node-drag-leave" | "node-drag-enter" | "node-drag-over")[], "current-change" | "node-expand" | "check-change" | "node-click" | "node-contextmenu" | "node-collapse" | "check" | "node-drag-start" | "node-drag-end" | "node-drop" | "node-drag-leave" | "node-drag-enter" | "node-drag-over", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: ArrayConstructor;
            default: () => never[];
        };
        emptyText: {
            type: StringConstructor;
        };
        renderAfterExpand: {
            type: BooleanConstructor;
            default: boolean;
        };
        nodeKey: StringConstructor;
        checkStrictly: BooleanConstructor;
        defaultExpandAll: BooleanConstructor;
        expandOnClickNode: {
            type: BooleanConstructor;
            default: boolean;
        };
        checkOnClickNode: BooleanConstructor;
        checkDescendants: {
            type: BooleanConstructor;
            default: boolean;
        };
        autoExpandParent: {
            type: BooleanConstructor;
            default: boolean;
        };
        defaultCheckedKeys: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeKey[]>;
        defaultExpandedKeys: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeKey[]>;
        currentNodeKey: import("vue").PropType<string | number>;
        renderContent: FunctionConstructor;
        showCheckbox: {
            type: BooleanConstructor;
            default: boolean;
        };
        draggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        allowDrag: FunctionConstructor;
        allowDrop: FunctionConstructor;
        props: {
            type: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").TreeOptionProps>;
            default: () => {
                children: string;
                label: string;
                disabled: string;
            };
        };
        lazy: {
            type: BooleanConstructor;
            default: boolean;
        };
        highlightCurrent: BooleanConstructor;
        load: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").LoadFunction>;
        filterNodeMethod: import("vue").PropType<import("element-plus/es/components/tree/src/tree.type").FilterNodeMethodFunction>;
        accordion: BooleanConstructor;
        indent: {
            type: NumberConstructor;
            default: number;
        };
        icon: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
    }>> & {
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onNode-expand"?: ((...args: any[]) => any) | undefined;
        onCheck?: ((...args: any[]) => any) | undefined;
        "onCheck-change"?: ((...args: any[]) => any) | undefined;
        "onNode-click"?: ((...args: any[]) => any) | undefined;
        "onNode-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onNode-collapse"?: ((...args: any[]) => any) | undefined;
        "onNode-drag-start"?: ((...args: any[]) => any) | undefined;
        "onNode-drag-end"?: ((...args: any[]) => any) | undefined;
        "onNode-drop"?: ((...args: any[]) => any) | undefined;
        "onNode-drag-leave"?: ((...args: any[]) => any) | undefined;
        "onNode-drag-enter"?: ((...args: any[]) => any) | undefined;
        "onNode-drag-over"?: ((...args: any[]) => any) | undefined;
    }, {
        lazy: boolean;
        props: import("element-plus/es/components/tree/src/tree.type").TreeOptionProps;
        data: unknown[];
        checkStrictly: boolean;
        accordion: boolean;
        draggable: boolean;
        defaultExpandAll: boolean;
        indent: number;
        renderAfterExpand: boolean;
        showCheckbox: boolean;
        expandOnClickNode: boolean;
        checkOnClickNode: boolean;
        checkDescendants: boolean;
        autoExpandParent: boolean;
        highlightCurrent: boolean;
    }>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: null;
        required: true;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: any;
}>;
export default _sfc_main;
