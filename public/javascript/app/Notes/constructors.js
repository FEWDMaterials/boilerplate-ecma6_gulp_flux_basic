
class Shape {
    constructor( sides ) {
        this.n = sides.length;
        this.sides = sides;
    }

    perimeter() {
        return this.sides.reduce(( perimeter, currentSide ) => {
            perimeter += currentSide;
            return perimeter;
        }, 0);
    }
}

const square = new Shape( [ 2, 2, 2, 2 ] );
square.perimeter();

class Square extends Shape {
    constructor( side ) {
        const sides = [];
        for( var i = 0; i < 4; ++i ) {
            sides.push( side );
        }
        super( sides );
    }
    area() {
        return this.sides[0] * this.sides[0];
    }
}

const s2 = new Square( 2 );
square.perimeter();
square.area();

function Shape( sides ) {
    this.n = sides.length;
    this.sides = sides;
}

Shape.prototype.perimeter = function() {
    return this.sides.reduce(( perimeter, currentSide ) => {
        perimeter += currentSide;
        return perimeter;
    }, 0);
}

function Square() {
    Shape.bind( this )();
}

Square.prototype = Object.create( Shape.prototype );
Square.prototype.area = function() {
    return this.sides[0] * this.sides[0];
}

function SquareFactory( n ) {
    return new Square( n );
}

SquareFactory( 5 );




















