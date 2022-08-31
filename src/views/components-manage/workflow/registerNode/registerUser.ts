export default function registerUser(lf:any) {
    lf.register('user', ({ PolygonNode, PolygonNodeModel, h }:{ PolygonNode:any, PolygonNodeModel:any, h:any }) => {
      class Node extends PolygonNode {
        getIconShape() {
          return h(
            'text',
            {
              fill: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              width: 50,
              height: 25
            }
          )
        }
  
        getShape() {
          const { model } = this.props
          const { width, height, x, y, points } = model
          const { fill, fillOpacity, strokeWidth, stroke, strokeOpacity, } = model.getNodeStyle()
          const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
          const pointsPath = points.map((point:any) => point.join(',')).join(' ')
          return h(
            'g',
            {
              transform
            },
            [
              h(
                'polygon',
                {
                  points: pointsPath,
                  fill,
                  stroke,
                  strokeWidth,
                  strokeOpacity,
                  fillOpacity
                }
              ),
              this.getIconShape()
            ]
          )
        }
      }
      class Model extends PolygonNodeModel {
        constructor(data:any, graphModel:any) {
          data.text = {
            value: (data.text && data.text.value) || '',
            x: data.x,
            y: data.y + 50
          }
          super(data, graphModel)
          // 右键菜单自由配置，也可以通过边的properties或者其他属性条件更换不同菜单
          // this.menu = [
          //   {
          //     className: 'lf-menu-delete',
          //     text: 'delete',
          //     callback(node:any) {
          //       // const comfirm = window.confirm('你确定要删除吗？')
          //       lf.deleteNode(node.id)
          //     }
          //   },
          //   {
          //     text: 'edit',
          //     className: 'lf-menu-item',
          //     callback(node:any) {
          //       lf.editText(node.id)
          //     }
          //   },
          //   {
          //     text: 'copy',
          //     className: 'lf-menu-item',
          //     callback(node:any) {
          //       lf.cloneNode(node.id)
          //     }
          //   }
          // ]
        }
  
        initNodeData(data:any) {
          super.initNodeData(data)
          const lenght = 35
          this.points = [
            [lenght, 0],
            [lenght * 2, lenght],
            [lenght, lenght * 2],
            [0, lenght]
          ]
        }
  
        // 自定义锚点样式
        getAnchorStyle() {
          const style = super.getAnchorStyle();
          style.hover.r = 8;
          style.hover.fill = "rgb(24, 125, 255)";
          style.hover.stroke = "rgb(24, 125, 255)";
          return style;
        }
      }
      return {
        view: Node,
        model: Model
      }
    })
  }
  