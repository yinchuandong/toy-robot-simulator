export class Scene {
  children: Scene[] = []

  addChild(child: Scene) {
    this.children.push(child)
  }
}
