/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DifferentiateNodeStatus } from '../interfaces/differentiate.interfaces';
var DifferentiateTree = /** @class */ (function () {
    function DifferentiateTree() {
        this.collapsed = true;
        this.showLeftActionButton = false;
        this.showRightActionButton = false;
        this.status = 1;
        this.side = "";
        this.level = "0";
        this.objectPath = "";
        this.leftSideToolTip = "take left side";
        this.rightSideToolTip = "take right side";
        this.onhover = new EventEmitter();
        this.onrevert = new EventEmitter();
        this.onexpand = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DifferentiateTree.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.depth = parseInt(this.level);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DifferentiateTree.prototype.bubleup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.side = this.side;
        this.onhover.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DifferentiateTree.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @return {?}
     */
    DifferentiateTree.prototype.changCounter = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var count = 0;
        this.children.map(function (item) {
            if (item.status !== DifferentiateNodeStatus.default) {
                count++;
            }
        });
        return count;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DifferentiateTree.prototype.expand = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onexpand.emit(this.objectPath);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DifferentiateTree.prototype.autoExpand = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onexpand.emit(event);
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DifferentiateTree.prototype.advanceToRightSide = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        child.path = this.objectPath + (this.objectPath.length ? ',' : '') + child.index;
        this.onrevert.emit({ type: "advance", node: child });
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DifferentiateTree.prototype.advanceToLeftSide = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        child.path = this.objectPath + (this.objectPath.length ? ',' : '') + child.index;
        this.onrevert.emit({ type: "revert", node: child });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DifferentiateTree.prototype.advance = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // bubble up the undo event.
        this.onrevert.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} flag
     * @param {?} i
     * @return {?}
     */
    DifferentiateTree.prototype.mouseOvered = /**
     * @param {?} event
     * @param {?} flag
     * @param {?} i
     * @return {?}
     */
    function (event, flag, i) {
        event.preventDefault();
        if (this.depth === 2) {
            event.stopPropagation();
            this.onhover.emit({
                hover: flag,
                index: i,
                path: this.objectPath
            });
        }
    };
    DifferentiateTree.decorators = [
        { type: Component, args: [{
                    selector: 'differentiate-tree',
                    template: "<div *ngIf=\"categorizeBy\" \r\n  class=\"diff-heading\" \r\n  (click)=\"expand($event)\">\r\n  <span class=\"arrow\" *ngIf=\"collapsed\">&#9658;</span>\r\n  <span class=\"arrow\" *ngIf=\"!collapsed\">&#9660;</span>\r\n  <span [textContent]=\"categorizeBy\"></span>\r\n  <span class=\"counter\" [textContent]=\"changCounter()\"></span>\r\n</div>\r\n<ul [class]=\"side\" [class.child]=\"depth ===2 || (categorizeBy && categorizeBy.length)\" [class.collapsed]=\"categorizeBy && collapsed\">\r\n  <li  *ngFor=\"let child of children\" \r\n    (mouseout)=\"depth === 2 ? mouseOvered($event, false, child.index) : null\"\r\n    (mouseover)=\"depth === 2 ? mouseOvered($event, true, child.index) : null\"\r\n    [class.hover]=\"child.hover\"\r\n    [class.added]=\"child.status === 5\" \r\n    [class.removed]=\"child.status === 6\" \r\n    [class.type-changed]=\"child.status === 2\" \r\n    [class.name-changed]=\"child.status === 3\" \r\n    [class.value-changed]=\"child.status === 4\">\r\n    <div \r\n      class='tree-node' \r\n      [ngClass]=\"'depth-' + depth\" \r\n      [class.left-action]=\"showLeftActionButton\"\r\n      [class.right-action]=\"showRightActionButton\" \r\n      [class.collapsed]=\"child.collapsed\" \r\n      [id] = \"child.id\">\r\n      <span [title]=\"rightSideToolTip\"\r\n        class=\"do\" \r\n        tabindex=\"0\"\r\n        aria-hidden=\"true\"\r\n        (keyup)=\"keyup($event)\"\r\n        (click)=\"advanceToRightSide(child)\"\r\n        *ngIf=\"showLeftActionButton && status !== child.status && child.status > 1\">&#9100;</span>\r\n      <span *ngIf='child.name && child.name!=null'\r\n        class='name' \r\n        [innerHTML]=\"child.name.length ? child.name : '&nbsp;'\">\r\n      </span>\r\n      <span *ngIf='child.value != undefined && child.value!=null'\r\n        class='value' \r\n        [class.string]=\"depth > 0 && child.value && child.value.length\"\r\n        [innerHTML]=\"child.value != undefined  ? ''+child.value : '&nbsp;'\">\r\n      </span>\r\n      <span [title]=\"leftSideToolTip\"\r\n        class=\"undo\" \r\n        tabindex=\"0\"\r\n        aria-hidden=\"true\"\r\n        (keyup)=\"keyup($event)\"\r\n        (click)=\"advanceToLeftSide(child)\"\r\n        *ngIf=\"showRightActionButton && status !== child.status && child.status > 1\">&#9100;</span>\r\n    </div>\r\n    <differentiate-tree *ngIf=\"child.children.length\" \r\n        [level]=\"depth+1\" \r\n        [status]=\"child.status\" \r\n        [collapsed]=\"child.collapsed\"\r\n        [categorizeBy]=\"child.categorizeBy\"\r\n        [showLeftActionButton]=\"showLeftActionButton\" \r\n        [leftSideToolTip]=\"leftSideToolTip\"\r\n        [showRightActionButton]=\"showRightActionButton\" \r\n        [rightSideToolTip]=\"rightSideToolTip\"\r\n        [objectPath]=\"objectPath + (objectPath.length ? ',':'') + child.index\"\r\n        (onhover)=\"bubleup($event)\"\r\n        (onrevert)=\"advance($event)\"\r\n        (onexpand)=\"autoExpand($event)\"\r\n        [class.child-node]=\"child.parent != 4\" \r\n        [children]='child.children'></differentiate-tree>\r\n    <div *ngIf=\"child.status > 2\" class=\"upper\" [class.collapsed]=\"child.collapsed\" [ngClass]=\"'depth-' + depth\" ></div>\r\n    <div *ngIf=\"child.status > 2\" class=\"lower\" [class.collapsed]=\"child.collapsed\" [ngClass]=\"'depth-' + depth\" ></div>\r\n  </li>\r\n</ul>\r\n\r\n",
                    styles: [":host{box-sizing:border-box;width:100%}:host.root{float:left;width:50%}:host.child-node{float:left}.diff-heading{padding:5px;font-weight:700;background:rgba(0,0,0,.02);border-bottom:1px solid rgba(0,0,0,.1);color:#666;cursor:pointer}.diff-heading .arrow{color:#999;font-size:.6rem;font-weight:700}.diff-heading .counter{float:right;border-radius:50%;width:16px;text-align:center;background-color:rgba(0,0,0,.4);font-size:.8rem;color:#fff}.diff-heading:first-child{border-top:1px solid rgba(0,0,0,.1)}ul{box-sizing:border-box;list-style:none;padding:0;width:100%}ul .collapsed,ul.collapsed{display:none!important}ul li .hover{background-color:rgba(0,0,0,.1)}ul li .hover .do,ul li .hover .undo{color:#000!important}ul li .tree-node{position:relative}ul li .tree-node.depth-0{display:none}ul li .tree-node .do,ul li .tree-node .undo{cursor:pointer;color:#751e1e;position:absolute;text-align:center;top:0;width:18px;z-index:2;height:100%}ul li .tree-node .undo{right:0}ul li .tree-node .do{left:0}ul.undefined li:hover{background-color:rgba(0,0,0,.1)}ul.left-side{border-right:1px solid rgba(0,0,0,.1);margin:0}ul.left-side li{position:relative;display:table;width:100%}ul.left-side li .do{border-right:1px solid #ddd;font-size:1.3rem;line-height:1.3rem;-webkit-transform:scale(-1,1);transform:scale(-1,1)}ul.left-side li .tree-node.left-action:before{position:absolute;top:0;left:0;width:18px;z-index:1;background:rgba(0,0,0,.02);height:100%;border-right:1px solid #ddd;content:' ';display:block}ul.left-side li.added .name,ul.left-side li.added .value{opacity:.2;font-style:italic}ul.left-side li.added .upper{border-radius:0 0 100%;box-sizing:border-box;height:50%;position:absolute;pointer-events:none;width:50%;top:0;right:0}ul.left-side li.added .upper.depth-1{border:2px solid #245024;border-top-width:0;border-left-width:0}ul.left-side li.added .upper.depth-2{border:2px dotted #378637;border-top-width:0;border-left-width:0}ul.left-side li.added .upper.depth-3{border:1px solid #48ad48;border-top-width:0;border-left-width:0}ul.left-side li.added .upper.depth-4{border:1px dotted #57d657;border-top-width:0;border-left-width:0}ul.left-side li.added .upper.depth-5{border:1px dashed #67fa67;border-top-width:0;border-left-width:0}ul.left-side li.added .lower{border-radius:0 100% 0 0;box-sizing:border-box;height:50%;position:absolute;pointer-events:none;width:50%;bottom:0;right:0}ul.left-side li.added .lower.depth-1{border:2px solid #245024;border-bottom-width:0;border-left-width:0}ul.left-side li.added .lower.depth-2{border:2px dotted #378637;border-bottom-width:0;border-left-width:0}ul.left-side li.added .lower.depth-3{border:1px solid #48ad48;border-bottom-width:0;border-left-width:0}ul.left-side li.added .lower.depth-4{border:1px dotted #57d657;border-bottom-width:0;border-left-width:0}ul.left-side li.added .lower.depth-5{border:1px dashed #67fa67;border-bottom-width:0;border-left-width:0}ul.left-side li.removed .upper{box-sizing:border-box;height:100%;position:absolute;width:66px;top:0;right:0;pointer-events:none}ul.left-side li.removed .upper:after{content:' - ';color:#962323;float:right;padding-right:10px;font-size:1.2rem;line-height:1.2rem}ul.left-side li.removed .lower{display:none}ul.left-side li.removed .tree-node span,ul.left-side li.type-changed .tree-node span{color:#962323}ul.left-side li.name-changed .upper{box-sizing:border-box;height:100%;position:absolute;width:66px;top:0;right:0;pointer-events:none}ul.left-side li.name-changed .upper:after{content:' ~ ';color:#000060;font-weight:700;float:right;padding-right:10px;font-size:1.2rem;line-height:1.2rem}ul.left-side li.name-changed .tree-node .name{color:#000060}ul.left-side li.value-changed .upper{box-sizing:border-box;height:100%;position:absolute;pointer-events:none;width:66px;top:0;right:0}ul.left-side li.value-changed .upper:after{content:' ~ ';color:#000060;font-weight:700;float:right;padding-right:10px;font-size:1.2rem;line-height:1.2rem}ul.left-side li.value-changed .tree-node .value{color:#000060}ul.right-side{border-left:1px solid rgba(0,0,0,.1);margin:0}ul.right-side li{position:relative;display:table;width:100%}ul.right-side li .undo{border-left:1px solid #ddd;font-size:1.3rem;line-height:1.3rem}ul.right-side li .tree-node.right-action:after{position:absolute;top:0;right:0;width:18px;z-index:1;background:rgba(0,0,0,.02);height:100%;border-left:1px solid #ddd;content:' ';display:block}ul.right-side li.added .upper{box-sizing:border-box;height:100%;position:absolute;pointer-events:none;width:90%;top:0;left:0}ul.right-side li.added .upper:after{content:'+';color:#4a4;font-weight:700;padding-left:5px;font-size:1.2rem;line-height:1.2rem}ul.right-side li.added .lower{display:none}ul.right-side li.added .tree-node span{color:#4a4}ul.right-side li.removed .name,ul.right-side li.removed .value{-webkit-text-decoration-line:line-through;text-decoration-line:line-through;-webkit-text-decoration-color:#962323;text-decoration-color:#962323}ul.right-side li.removed .upper{border-radius:0 0 0 100%;box-sizing:border-box;height:50%;width:10%;position:absolute;pointer-events:none;top:0}ul.right-side li.removed .upper.depth-1{border:2px solid #600000;border-top-width:0;border-right-width:0}ul.right-side li.removed .upper.depth-2{border:2px dotted maroon;border-top-width:0;border-right-width:0}ul.right-side li.removed .upper.depth-3{border:1px solid #a00000;border-top-width:0;border-right-width:0}ul.right-side li.removed .upper.depth-4{border:1px dotted #c00000;border-top-width:0;border-right-width:0}ul.right-side li.removed .upper.depth-5{border:1px dashed #f00000;border-top-width:0;border-right-width:0}ul.right-side li.removed .lower{border-radius:100% 0 0;box-sizing:border-box;height:50%;width:10%;position:absolute;pointer-events:none;bottom:0}ul.right-side li.removed .lower.depth-1{border:2px solid #600000;border-bottom-width:0;border-right-width:0}ul.right-side li.removed .lower.depth-2{border:2px dotted maroon;border-bottom-width:0;border-right-width:0}ul.right-side li.removed .lower.depth-3{border:1px solid #a00000;border-bottom-width:0;border-right-width:0}ul.right-side li.removed .lower.depth-4{border:1px dotted #c00000;border-bottom-width:0;border-right-width:0}ul.right-side li.removed .lower.depth-5{border:1px dashed #f00000;border-bottom-width:0;border-right-width:0}ul.right-side li.type-changed .tree-node span{color:#962323}ul.right-side li.name-changed .upper{box-sizing:border-box;height:100%;position:absolute;pointer-events:none;top:0;left:0}ul.right-side li.name-changed .upper:before{content:' ~ ';color:#000060;font-weight:700;float:right;padding-left:5px;font-size:20px;line-height:16px}ul.right-side li.name-changed .tree-node .name{color:#000060}ul.right-side li.value-changed .upper{box-sizing:border-box;height:100%;position:absolute;pointer-events:none;top:0;left:0}ul.right-side li.value-changed .upper:before{content:' ~ ';color:#000060;font-weight:700;float:right;padding-left:5px;font-size:20px;line-height:16px}ul.right-side li.value-changed .tree-node .value{color:#000060}ul .tree-node{box-sizing:border-box;color:#7c9eb2;display:table;padding:0;position:relative;margin:0;width:100%}ul .tree-node.depth-0{padding-left:5px}ul .tree-node.depth-1{padding-left:20px}ul .tree-node.depth-2{padding-left:40px}ul .tree-node.depth-3{padding-left:60px}ul .tree-node.depth-4{padding-left:80px}ul .tree-node.depth-5{padding-left:100px}ul .tree-node.depth-6{padding-left:120px}ul .tree-node.depth-7{padding-left:140px}ul .tree-node.depth-8{padding-left:160px}ul .tree-node.depth-9{padding-left:180px}ul .tree-node.depth-10{padding-left:200px}ul .tree-node .name{color:#444;font-weight:700}ul .tree-node .name:after{content:':'}ul .tree-node .value.string:after,ul .tree-node .value.string:before{content:'\"'}"]
                }] }
    ];
    DifferentiateTree.propDecorators = {
        collapsed: [{ type: Input, args: ["collapsed",] }],
        children: [{ type: Input, args: ["children",] }],
        showLeftActionButton: [{ type: Input, args: ["showLeftActionButton",] }],
        showRightActionButton: [{ type: Input, args: ["showRightActionButton",] }],
        status: [{ type: Input, args: ["status",] }],
        side: [{ type: Input, args: ["side",] }],
        level: [{ type: Input, args: ["level",] }],
        objectPath: [{ type: Input, args: ["objectPath",] }],
        categorizeBy: [{ type: Input, args: ["categorizeBy",] }],
        leftSideToolTip: [{ type: Input, args: ["leftSideToolTip",] }],
        rightSideToolTip: [{ type: Input, args: ["rightSideToolTip",] }],
        onhover: [{ type: Output, args: ["onhover",] }],
        onrevert: [{ type: Output, args: ["onrevert",] }],
        onexpand: [{ type: Output, args: ["onexpand",] }]
    };
    return DifferentiateTree;
}());
export { DifferentiateTree };
if (false) {
    /** @type {?} */
    DifferentiateTree.prototype.depth;
    /** @type {?} */
    DifferentiateTree.prototype.collapsed;
    /** @type {?} */
    DifferentiateTree.prototype.children;
    /** @type {?} */
    DifferentiateTree.prototype.showLeftActionButton;
    /** @type {?} */
    DifferentiateTree.prototype.showRightActionButton;
    /** @type {?} */
    DifferentiateTree.prototype.status;
    /** @type {?} */
    DifferentiateTree.prototype.side;
    /** @type {?} */
    DifferentiateTree.prototype.level;
    /** @type {?} */
    DifferentiateTree.prototype.objectPath;
    /** @type {?} */
    DifferentiateTree.prototype.categorizeBy;
    /** @type {?} */
    DifferentiateTree.prototype.leftSideToolTip;
    /** @type {?} */
    DifferentiateTree.prototype.rightSideToolTip;
    /** @type {?} */
    DifferentiateTree.prototype.onhover;
    /** @type {?} */
    DifferentiateTree.prototype.onrevert;
    /** @type {?} */
    DifferentiateTree.prototype.onexpand;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZmVyZW50aWF0ZS10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC9kaWZmZXJlbnRpYXRlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaWZmZXJlbnRpYXRlL2NvbXBvbmVudHMvZGlmZmVyZW50aWF0ZS10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQzs7O3lCQVdqRSxJQUFJO29DQU1PLEtBQUs7cUNBR0osS0FBSztzQkFHcEIsQ0FBQztvQkFHSCxFQUFFO3FCQUdELEdBQUc7MEJBR0UsRUFBRTsrQkFNRyxnQkFBZ0I7Z0NBR2YsaUJBQWlCO3VCQUcxQixJQUFJLFlBQVksRUFBRTt3QkFHakIsSUFBSSxZQUFZLEVBQUU7d0JBR2xCLElBQUksWUFBWSxFQUFFOzs7OztJQUU3QixvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsbUNBQU87Ozs7SUFBUCxVQUFRLEtBQUs7UUFDWCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsaUNBQUs7Ozs7SUFBTCxVQUFNLEtBQUs7O1FBQ1QsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO0tBQ0E7Ozs7SUFFRCx3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bnQiOlsiLypcclxuICogQSBjb21wYXJpc2lvbiB0cmVlIHdpbGwgbGF5b3V0IGVhY2ggYXR0cmlidXRlIG9mIGEganNvbiBkZWVwIHRocm91Z2ggaXRzIGhlaXJhcmNoeSB3aXRoIGdpdmVuIHZpc3VhbCBxdWV1ZXNcclxuICogdGhhdCByZXByZXNlbnRzIGEgZGVsZXRpb24sIGFkaXRpb24sIG9yIGNoYW5nZSBvZiBhdHRyaWJ1dGUgZnJvbSB0aGUgb3RoZXIgdHJlZS4gVGhlIHN0YXR1cyBvZiBlYWNoIG5vZGUgaXMgXHJcbiAqIGV2YWx1YXRlZCBieSB0aGUgcGFyZW50IGNvbXBhcmlzaW9uIHRvb2wuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtEaWZmZXJlbnRpYXRlTm9kZVN0YXR1c30gZnJvbSAnLi4vaW50ZXJmYWNlcy9kaWZmZXJlbnRpYXRlLmludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkaWZmZXJlbnRpYXRlLXRyZWUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWZmZXJlbnRpYXRlLXRyZWUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RpZmZlcmVudGlhdGUtdHJlZS5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlmZmVyZW50aWF0ZVRyZWUgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgZGVwdGg6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KFwiY29sbGFwc2VkXCIpXHJcbiAgY29sbGFwc2VkID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KFwiY2hpbGRyZW5cIilcclxuICBjaGlsZHJlbjtcclxuXHJcbiAgQElucHV0KFwic2hvd0xlZnRBY3Rpb25CdXR0b25cIilcclxuICBzaG93TGVmdEFjdGlvbkJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoXCJzaG93UmlnaHRBY3Rpb25CdXR0b25cIilcclxuICBzaG93UmlnaHRBY3Rpb25CdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwic3RhdHVzXCIpXHJcbiAgc3RhdHVzID0gMTtcclxuXHJcbiAgQElucHV0KFwic2lkZVwiKVxyXG4gIHNpZGUgPSBcIlwiO1xyXG5cclxuICBASW5wdXQoXCJsZXZlbFwiKVxyXG4gIGxldmVsID0gXCIwXCI7XHJcblxyXG4gIEBJbnB1dChcIm9iamVjdFBhdGhcIilcclxuICBvYmplY3RQYXRoID0gXCJcIjtcclxuXHJcbiAgQElucHV0KFwiY2F0ZWdvcml6ZUJ5XCIpXHJcbiAgY2F0ZWdvcml6ZUJ5OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dChcImxlZnRTaWRlVG9vbFRpcFwiKVxyXG4gIGxlZnRTaWRlVG9vbFRpcCA9IFwidGFrZSBsZWZ0IHNpZGVcIjtcclxuXHJcbiAgQElucHV0KFwicmlnaHRTaWRlVG9vbFRpcFwiKVxyXG4gIHJpZ2h0U2lkZVRvb2xUaXAgPSBcInRha2UgcmlnaHQgc2lkZVwiO1xyXG5cclxuICBAT3V0cHV0KFwib25ob3ZlclwiKVxyXG4gIG9uaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoXCJvbnJldmVydFwiKVxyXG4gIG9ucmV2ZXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KFwib25leHBhbmRcIilcclxuICBvbmV4cGFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRlcHRoID0gcGFyc2VJbnQodGhpcy5sZXZlbCk7XHJcbiAgfVxyXG5cclxuICBidWJsZXVwKGV2ZW50KSB7XHJcbiAgICBldmVudC5zaWRlID0gdGhpcy5zaWRlO1xyXG4gICAgdGhpcy5vbmhvdmVyLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICBldmVudC50YXJnZXQuY2xpY2soKTtcclxuXHRcdH1cclxuICB9XHJcblxyXG4gIGNoYW5nQ291bnRlcigpIHtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICB0aGlzLmNoaWxkcmVuLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgaWYoaXRlbS5zdGF0dXMgIT09IERpZmZlcmVudGlhdGVOb2RlU3RhdHVzLmRlZmF1bHQpIHtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGNvdW50O1xyXG4gIH1cclxuXHJcbiAgZXhwYW5kKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uZXhwYW5kLmVtaXQoIHRoaXMub2JqZWN0UGF0aCApO1xyXG4gIH1cclxuICBhdXRvRXhwYW5kKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uZXhwYW5kLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuICBhZHZhbmNlVG9SaWdodFNpZGUoY2hpbGQpIHtcclxuICAgIGNoaWxkLnBhdGggPSB0aGlzLm9iamVjdFBhdGggKyAodGhpcy5vYmplY3RQYXRoLmxlbmd0aCA/ICcsJzonJykgKyBjaGlsZC5pbmRleDtcclxuICAgIHRoaXMub25yZXZlcnQuZW1pdCh7dHlwZTpcImFkdmFuY2VcIiwgbm9kZTogY2hpbGR9KTtcclxuICB9XHJcbiAgYWR2YW5jZVRvTGVmdFNpZGUoY2hpbGQpIHtcclxuICAgIGNoaWxkLnBhdGggPSB0aGlzLm9iamVjdFBhdGggKyAodGhpcy5vYmplY3RQYXRoLmxlbmd0aCA/ICcsJzonJykgKyBjaGlsZC5pbmRleDtcclxuICAgIHRoaXMub25yZXZlcnQuZW1pdCh7dHlwZTpcInJldmVydFwiLCBub2RlOiBjaGlsZH0pO1xyXG4gIH1cclxuICBhZHZhbmNlKGV2ZW50KSB7XHJcbiAgICAvLyBidWJibGUgdXAgdGhlIHVuZG8gZXZlbnQuXHJcbiAgICB0aGlzLm9ucmV2ZXJ0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VPdmVyZWQoZXZlbnQsIGZsYWcsIGkpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGVwdGggPT09IDIpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLm9uaG92ZXIuZW1pdCh7XHJcbiAgICAgICAgaG92ZXI6IGZsYWcsXHJcbiAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgcGF0aDogdGhpcy5vYmplY3RQYXRoXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=