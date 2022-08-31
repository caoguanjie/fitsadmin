export default function registerEnd1(lf:any) {
    lf.register('出院', ({ RectNode, RectNodeModel, h }:{ RectNode:any, RectNodeModel:any, h:any}) => {
      class EndNode extends RectNode {
        getShape() {
          const { model } = this.props
          const { width, height, x, y, rx } = model
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
            rx,
            fill,
            stroke,
            strokeWidth,
            ...position
          });
        }
      }
      class EndModel extends RectNodeModel {
        setAttributes() {
          const text = this.properties.text || "出院"
          if (this.properties.text) {
            let len = 0
            if (text.length > 25) {
              len = 400
              this.height = 60
            } else {
              len = text.length * 16
              this.height = 33
            }
            this.width = len + 30
          } else {
            this.width = text.length * 16 + 30
            this.height = 33
          }
          this.rx = 7;
        }
  
        // 自定义节点样式属性
        getNodeStyle() {
          const style = super.getNodeStyle()
          style.fill = "#B37FEB"
          return style
        }
  
        getTextStyle() {
          const style = super.getTextStyle();
          style.fontSize = 16;
          style.color = '#fff';
          style.fontWeight = "bold"
          return style;
        }
      }
      return {
        view: EndNode,
        model: EndModel
      }
    })
  }
  