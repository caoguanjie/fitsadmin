export default function registerPolyline(lf:any) {
    lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }:{ PolylineEdge:any, PolylineEdgeModel:any }) => {
      class ConnnectionModel extends PolylineEdgeModel {
        constructor(data:any, graphModel:any) {
          super(data, graphModel)
          this.state = {}
        }
      }
      return {
        view: PolylineEdge,
        model: ConnnectionModel
      }
    })
  }
  