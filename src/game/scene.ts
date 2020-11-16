/**
 * This is a basic class for all game objects. It defines some common properties
 * and methods
 */
export class Scene {
  children: Scene[] = []

  addChild(child: Scene) {
    this.children.push(child)
  }
}
