import {Shape} from '../core/math/shape';
import {CircleShape} from '../core/math/circle.shape';
import {RectangleShape} from '../core/math/rectangle.shape';
import {TriangleShape} from '../core/math/triangle.shape';
import {Vector} from '../core/math/vector';

export class Detection
{
    // private BIT_FLAGS_CIRCLE = 0b100;
    // private BIT_FLAGS_RECTANGLE = 0b010;
    // private BIT_FLAGS_TRIANGLE = 0b001;
    //
    // /**
    //  * Returns true if the first shape collided with the second shape.
    //  * Detects the types and redirects to the proper private method to handle type vs type detection.
    //  *
    //  * @param s1
    //  * @param s2
    //  */
    // public detectCollision(s1: Shape, s2: Shape): boolean
    // {
    //     // Circle Bit, Rectangle Bit, Triangle Bit
    //     let first = this.getTypeBit(s1);
    //     let second = this.getTypeBit(s2);
    //
    //     if (first & this.BIT_FLAGS_CIRCLE && second & this.BIT_FLAGS_CIRCLE) {
    //         return this.circleCircleCollision(s1, s2);
    //     } else if (first & this.BIT_FLAGS_CIRCLE && second & this.BIT_FLAGS_RECTANGLE) {
    //         return this.circleRectangleCollision(s1, s2);
    //     } else if (first & this.BIT_FLAGS_CIRCLE && second & this.BIT_FLAGS_TRIANGLE) {
    //         return this.circleTriangleCollision(s1, s2);
    //     } else if (first & this.BIT_FLAGS_RECTANGLE && second & this.BIT_FLAGS_RECTANGLE) {
    //         return this.rectangleRectangleCollision(s1, s2);
    //     } else if (first & this.BIT_FLAGS_RECTANGLE && second & this.BIT_FLAGS_TRIANGLE) {
    //         return this.rectangleTriangleCollision(s1, s2);
    //     } else if (first & this.BIT_FLAGS_TRIANGLE && second & this.BIT_FLAGS_TRIANGLE) {
    //         return this.triangleTriangleCollision(s1, s2);
    //     } else {
    //         throw new Error('Unknown shape configuration passed to detect collision');
    //     }
    // }
    //
    // private getTypeBit(s: Shape): number
    // {
    //     return 0b000
    //         | (s instanceof CircleShape ? this.BIT_FLAGS_CIRCLE : 0b000)
    //         | (s instanceof RectangleShape ? this.BIT_FLAGS_RECTANGLE : 0b000)
    //         | (s instanceof TriangleShape ? this.BIT_FLAGS_TRIANGLE : 0b000);
    // }
    //
    // private circleCircleCollision(c1: CircleShape, c2: CircleShape): boolean
    // {
    //     let dist = c1.position.dist(c2.position);
    //     return dist < c1.radius + c2.radius;
    // }
    //
    // private circleRectangleCollision(c: CircleShape, r: RectangleShape): boolean
    // {
    //     let normals = this.generateNormals(r);
    // }
    //
    // private circleTriangleCollision(c: CircleShape, t: TriangleShape): boolean
    // {
    //
    // }
    //
    // private rectangleRectangleCollision(r1: RectangleShape, r2: RectangleShape): boolean
    // {
    //
    // }
    //
    // private rectangleTriangleCollision(r: RectangleShape, t: TriangleShape): boolean
    // {
    //
    // }
    //
    // private triangleTriangleCollision(t1: TriangleShape, t2: TriangleShape): boolean
    // {
    //
    // }
    //
    // private generateNormals(s: TriangleShape|RectangleShape): Vector[]
    // {
    //     let normals = [];
    //
    //     s.vertices.map(
    //         (vertex, index) => {
    //             normals.push(
    //                 vertex.normal(
    //                     s.vertices[
    //                         (index+1) % s.vertices.length
    //                     ]
    //                 )
    //             );
    //         }
    //     );
    //
    //     return normals;
    // }
}