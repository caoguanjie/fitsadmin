export default function registerTask(lf:any) {
    lf.register('task', ({ RectNode, RectNodeModel, h }:{ RectNode:any, RectNodeModel:any, h:any }) => {
      class taskNode extends RectNode {
        getShape() {
          const { model } = this.props
          const { width, height, x, y } = model
          const position = {
            x: x - width / 2,
            y: y - height / 2,
          }
          const {
            fill,
            stroke,
            strokeWidth
          } = model.getNodeStyle()
          return h("rect", {
            width,
            height,
            fill,
            stroke,
            strokeWidth,
            ...position
          });
        }
      }
      class Model extends RectNodeModel {
        // constructor(data:any, graphModel:any) {
        //   super(data, graphModel)
        //   this.radius = 20;
        //   this.width = 30
        // }
  
        initNodeData(data:any) {
          super.initNodeData(data);
        }
  
        // 自定义节点样式属性
        getNodeStyle() {
          const style = super.getNodeStyle()
          style.strokeWidth = 1
          return style
        }
      }
      return {
        view: taskNode,
        model: Model
      }
    })
  }
  