class Collider {
    constructor() {
        this.mapX = 16
        this.mapY = 8
        this.collision_map = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        ]
        this.tile_size = 16
    }

    collisionCheck(transform) {
        let top, bottom, left, right, tileValue

        top = Math.floor(transform.getTop() / this.tile_size)
        left = Math.floor(transform.getLeft() / this.tile_size)
        tileValue = this.collision_map[top * this.mapX + left]
        this.collide(tileValue, transform, left * this.tile_size, top * this.tile_size, this.tile_size)

        top = Math.floor(transform.getTop() / this.tile_size)
        right = Math.floor(transform.getRight() / this.tile_size)
        tileValue = this.collision_map[top * this.mapX + right]
        this.collide(tileValue, transform, right * this.tile_size, top * this.tile_size, this.tile_size)

        bottom = Math.floor(transform.getBottom() / this.tile_size)
        left = Math.floor(transform.getLeft() / this.tile_size)
        tileValue = this.collision_map[bottom * this.mapX + left]
        this.collide(tileValue, transform, left * this.tile_size, bottom * this.tile_size, this.tile_size)

        bottom = Math.floor(transform.getBottom() / this.tile_size)
        right = Math.floor(transform.getRight() / this.tile_size)
        tileValue = this.collision_map[bottom * this.mapX + right]
        this.collide(tileValue, transform, right * this.tile_size, bottom * this.tile_size, this.tile_size)
    }

    collide(value, transform, tile_x, tile_y, tile_size) {
        switch(value) {
            case 1: this.collideTop(transform, tile_y)
        }
    }

    collideTop(transform, tile_top) {
        if (transform.getOldBottom() <= tile_top && transform.getBottom() > tile_top) {
            transform.setBottom(tile_top)
            transform.velocityY = 0
            transform.grounded = true
        }
    }

    collideRight(transform, tile_right) {

    }

    collideBottom(transform, tile_bottom) {

    }

    collideLeft(transform, tile_left) {

    }
}