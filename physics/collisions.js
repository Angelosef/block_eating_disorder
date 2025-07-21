export function setupCollisions(scene, player, boxes, platforms) {
  scene.physics.add.collider(player, platforms);
  scene.physics.add.collider(boxes, platforms);
  scene.physics.add.collider(player, boxes);
}
