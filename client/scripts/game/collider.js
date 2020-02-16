class Collider {
    constructor() {
        this.mapX = 16
        this.mapY = 8
        this.collision_map = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
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
            case 1:  this.collideTop(transform, tile_y); break                     // top
            case 2:  this.collideRight(transform, tile_x + tile_size); break       // right
            case 3:  this.collideBottom(transform, tile_y + tile_size); break      // bottom
            case 4:  this.collideLeft(transform, tile_x); break                    // left
            case 5:  if (this.collideTop(transform, tile_y)) return                // top-right
                     this.collideRight(transform, tile_x + tile_size); break 
            case 6:  if (this.collideRight(transform, tile_x + tile_size)) return  // right-bottom
                     this.collideBottom(transform, tile_y + tile_size); break
            case 7:  if (this.collideBottom(transform, tile_y + tile_size)) return // bottom-left
                     this.collideLeft(transform, tile_x); break
            case 8:  if (this.collideLeft(transform, tile_x)) return               // left-top
                     this.collideTop(transform, tile_y); break
            case 9:  if (this.collideTop(transform, tile_y)) return                // top-bottom
                     this.collideBottom(transform, tile_y + tile_size); break
            case 10: if (this.collideRight(transform, tile_x + tile_size)) return  // right-left
                     this.collideLeft(transform, tile_x); break
            case 11: if (this.collideTop(transform, tile_y)) return                // top-right-bottom
                     if (this.collideRight(transform, tile_x + tile_size)) return
                     this.collideBottom(transform, tile_y + tile_size); break
            case 12: if (this.collideRight(transform, tile_x + tile_size)) return  //  right-bottom-left
                     if (this.collideBottom(transform, tile_y + tile_size)) return
                     this.collideLeft(transform, tile_x); break
            case 13: if (this.collideBottom(transform, tile_y + tile_size)) return // bottom-left-top
                     if (this.collideLeft(transform, tile_x)) return
                     this.collideTop(transform, tile_y); break
            case 14: if (this.collideLeft(transform, tile_x)) return               // left-top-right
                     if (this.collideTop(transform, tile_y)) return
                     this.collideRight(transform, tile_x + tile_size); break
            case 15: if (this.collideTop(transform, tile_y)) return                // top-right-left-bottom
                     if (this.collideRight(transform, tile_x + tile_size)) return
                     if (this.collideBottom(transform, tile_y + tile_size)) return
                     this.collideLeft(transform, tile_x); break
        }
    }

    collideTop(transform, tile_top) {
        if (transform.getOldBottom() <= tile_top && transform.getBottom() > tile_top) {
            transform.setBottom(tile_top)
            transform.velocityY = 0
            transform.grounded = true
            return true
        }
        return false
    }

    collideRight(transform, tile_right) {
        if (transform.getOldLeft() >= tile_right && transform.getLeft() < tile_right) {
            transform.setLeft(tile_right)
            transform.velocityX = 0
            return true
        }
        return false
    }

    collideBottom(transform, tile_bottom) {
        if (transform.getOldTop() >= tile_bottom && transform.getTop() < tile_bottom) {
            transform.setTop(tile_bottom)
            transform.velocityY = 0
            return true
        }
        return false
    }

    collideLeft(transform, tile_left) {
        if (transform.getRight() >= tile_left && transform.getRight() < tile_left) {
            transform.setRight(tile_left)
            transform.velocityX = 0
            return true
        }
        return false
    }
}