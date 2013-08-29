# Matrix Math

This JavaScript module contains a Matrix class that will help you work with mathematical matrices.

## Usage

The module is created in the CommonJS format, exporting using module.exports, meaning you need a CommonJS require system to use it. It is published in npm, so including it in node.js is simple:

Install it in the command line:

```
npm install matrixmath
```

Then include the module in your code:

```
var Matrix = require('matrixmath/Matrix');
```

## API

### Overview

**Constructor**

* new Matrix(rows)
* new Matrix(numRows, numCols)

**Instance properties**

* rows

**Static methods**

* add (matrix, matrix1[,…matrixN])
* subtract (matrix, matrix1[,…matrixN])
* multiply (matrix, matrix1[,…matrixN])
* divide (matrix, matrix1[,…matrixN])

**Instance methods**

* add (matrix[,…matrixN])
* subtract (matrix[,…matrixN])
* multiply (matrix[,…matrixN])
* divide (matrix[,…matrixN])
* power (number)
* transpose ()
* invert ()
* getDeterminant ()
* equals ()




### Constructor

Create a new Matrix instance by using the constructor:

#### new Matrix(rows)

```
var matrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);
```

#### new Matrix(numRows, numCols)

```
var matrix = new Matrix(2, 3);
```
```
> console.log(matrix.rows);
[
  [0, 0, 0],
  [0, 0, 0]
]
```

---

### Instance properties

#### matrix.rows

The rows property contains the matrix represented as an array of rows, where each row is an array of numbers.

```
> console.log(matrix.rows);
[
  [0, 0, 0],
  [0, 0, 0]
]
```

---

### Static methods

The following methods will return a new Matrix instance.


#### Matrix.identity(size)

Creates an identity matrix with the given number of rows and columns.

```
var matrix = Matrix.identity(3);
```

```
> console.log(matrix.rows);
[
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]
```


#### Matrix.add(matrix1, matrix2[,…matrixN])

Creates a new matrix with the sum of the passed in matrices. All matrices must have the same size. If a matrix is found that is not the same size, it is skipped.

```
var matrix = Matrix.add(matrix1, matrix2);
```


#### Matrix.subtract(matrix1, matrix2[,…matrixN])

Creates a new matrix with the difference of the passed in matrices. All matrices must have the same size. If a matrix is found that is not the same size, it is skipped.

```
var matrix = Matrix.subtract(matrix1, matrix2);
```


#### Matrix.multiply(matrix1, matrix2[,…matrixN])

Creates a new matrix with the product of the passed in matrices. All matrices must either be square and of the same size, or the next matrix in line must have the same number of rows as the number of columns in the previous result.

The first argument must be a matrix instance, but the rest can be either matrices or numbers. If a number is seen, a scalar multiplication is made.

```
var matrix = Matrix.multiply(matrix1, matrix2);
// or
var matrix = Matrix.multiply(matrix1, 3);
```


#### Matrix.divide(matrix1, matrix2[,…matrixN])

Creates a new matrix with the quotient of the passed in matrices. All matrices must be square and of the same size.

```
var matrix = Matrix.divide(matrix1, matrix2);
```

---

### Instance methods

The following methods are available on all Matrix instances.


#### matrix.clone()

Returns a new matrix with the same content as the first one.

```
var matrix = Matrix.identity(2);
var matrix1 = matrix.clone();
```


#### matrix.add(matrix1[,…matrixN])

Adds all the matrices into the original matrix. All matrices must have the same size as the original one. If a matrix is found that is not the same size, it is skipped.

```
var matrix = new Matrix([ [1, 2, 3] ]);
var matrix1 = new Matrix([ [2, 4, 6] ]);
matrix.add(matrix1);
```
```
> console.log(matrix.rows);
[
  [3, 6, 9]
]
```


#### matrix.subtract(matrix1[,…matrixN])

Subtracts all the matrices from the original matrix. All matrices must have the same size as the original one. If a matrix is found that is not the same size, it is skipped.

```
var matrix = new Matrix([ [1, 2, 3] ]);
var matrix1 = new Matrix([ [2, 4, 6] ]);
matrix.subtract(matrix1);
```
```
> console.log(matrix.rows);
[
  [-2, -2, -3]
]
```


#### matrix.multiply(matrix1[,…matrixN])

Multiplies all the matrices into the original matrix. All matrices must either be square and of the same size, or the next matrix in line must have the same number of rows as the number of columns in the previous result.

The arguments can be either matrices or numbers. If a number is seen, a scalar multiplication is made.

```
var matrix = new Matrix([ [1, 2], [3, 4] ]);
var matrix1 = new Matrix( [[2, 4], [6, 8] ]);
matrix.multiply(matrix1);
```
```
> console.log(matrix.rows);
[
  [14, 20],
  [30, 44]
]
```

```
var matrix = new Matrix([ [1, 2], [3, 4] ]);
matrix.multiply(3);
```
```
> console.log(matrix.rows);
[
  [3, 6],
  [9, 12]
]
```


#### matrix.divide(matrix1[,…matrixN])

Divides all the matrices from the original matrix. All matrices must be square and of the same size as the original matrix.

```
var matrix = new Matrix([ [1, 0], [0, 1] ]);
var matrix1 = new Matrix( [[2, 0], [0, 2] ]);
matrix.divide(matrix1);
```
```
> console.log(matrix.rows);
[
  [0.5, 0],
  [0, -0.5]
]
```

#### matrix.power(number)

Raises the matrix to the the given power.

```
var matrix = new Matrix([[1, 2], [4, 1]]);
matrix.power(3);
```
```
> console.log(matrix.rows);
[
  [25, 22],
  [44, 25]
]
```

#### matrix.transpose()

Transposes the matrix.

```
var matrix = new Matrix([
  [1, 2],
  [4, 1]
]);
matrix.transpose();
```
```
> console.log(matrix.rows);
[
  [1, 4],
  [2, 1]
]
```

#### matrix.invert()

Inverts the matrix.

```
var matrix = new Matrix([
  [3, 0, 2],
  [2, 0, -2],
  [0, 1, 1]
]);
matrix.invert();
```
```
> console.log(matrix.rows);
[
  [0.2, 0.2, 0],
  [-0.2, 0.3, 1],
  [0.2, -0.3, 0]
]
```

#### matrix.getDeterminant()

Gets the determinant of the matrix. The matrix must be square for this to be possible. If it's not square, this will return `null`.

```
var matrix = new Matrix([[4, 6], [3, 8]]);
var determinant = matrix.getDeterminant();
```
```
> console.log(determinant);
14
```

#### matrix.equals(matrix1)

Tests if the matrix has the same content as another matrix. Returns `true` if it has, `false` otherwise.

```
var matrix = new Matrix([[3, 0], [2, 0], [0, 1]]);
var matrix1 = new Matrix([[3, 0], [2, 0], [0, 1]]);
var matrix2 = new Matrix([[3, 0], [2, 0]]);

matrix.equals(matrix1); // true
matrix.equals(matrix2); // false
```


## Versioning

This module is versioned according to [Semantic Versioning](http://semver.org/) (uses the format major.minor.patch). If there is a breaking change, the major part of the version number will be updated.


## Unit tests

The Matrix class is fully unit tested with over 60 tests. It uses mocha and expect.js and can be run from node.js in the command line.


## License

The project is licensed under the MIT license.

Copyright (c) 2013 Johannes Koggdal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.