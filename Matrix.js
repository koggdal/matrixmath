'use strict';
/**
 * @author Johannes Koggdal
 */

/**
 * A class for representing and working with a mathematical matrix.
 *
 * @constructor
 *
 * @param {Array|number=} opt_rowsOrData If an array, it is interpreted
 *     as data for the matrix. That means the length of the array is the
 *     number of rows. Each item in the array should be an array where
 *     the length is interpreted as the number of columns. Example:
 *     [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *     If a number, it will create a matrix with that number of rows.
 *
 * @param {number=} opt_cols The number of columns for the matrix. If
 *     an array was passed as the first argument, this is ignored.
 *
 * @example
 * // Create a matrix with data
 * var matrix = new Matrix([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ]);
 *
 * // Create a matrix filled with zeros
 * // The matrix will be 3 rows and 2 columns
 * var matrix = new Matrix(3, 2);
 */
function Matrix(opt_rowsOrData, opt_cols) {
  if (Array.isArray(opt_rowsOrData)) {
    this.rows = opt_rowsOrData;

  } else {
    var numRows = opt_rowsOrData || 1;
    var numCols = opt_cols || 1;
    var rows = new Array(numRows);

    for (var row = 0; row < numRows; row++) {
      var rowData = new Array(numCols);
      rows[row] = rowData;
      for (var col = 0; col < numCols; col++) {
        rowData[col] = 0;
      }
    }

    this.rows = rows;
  }
}

/**
 * Create a new identity matrix for a given size.
 *
 * @param {number} size Number of rows/columns.
 *
 * @return {Matrix} A new matrix.
 */
Matrix.identity = function(size) {
  var matrix = new Matrix(size, size);

  for (var i = 0; i < size; i++) {
    matrix.rows[i][i] = 1;
  }

  return matrix;
};

/**
 * Add matrices together and return a new matrix.
 * It will clone the first matrix and add to that.
 *
 * @param {...Matrix} var_args At least two Matrix instances as
 *     multiple arguments.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.add = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);
  var firstMatrix = matrices.shift();

  var outputMatrix = firstMatrix.clone();
  outputMatrix.add.apply(outputMatrix, matrices);

  return outputMatrix;
};

/**
 * Subtract matrices and return a new matrix.
 * It will clone the first matrix and subtract from that.
 *
 * @param {...Matrix} var_args At least two Matrix instances as
 *     multiple arguments.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.subtract = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);
  var firstMatrix = matrices.shift();

  var outputMatrix = firstMatrix.clone();
  outputMatrix.subtract.apply(outputMatrix, matrices);

  return outputMatrix;
};

/**
 * Multiply matrices and return a new matrix.
 * It will clone the first matrix and multiply that.
 *
 * @param {...Matrix} var_args At least two Matrix instances as
 *     multiple arguments.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.multiply = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);
  var firstMatrix = matrices.shift();

  var outputMatrix = firstMatrix.clone();
  outputMatrix.multiply.apply(outputMatrix, matrices);

  return outputMatrix;
};

/**
 * Divide matrices and return a new matrix.
 * It will clone the first matrix and divide that.
 *
 * @param {...Matrix} var_args At least two Matrix instances as
 *     multiple arguments.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.divide = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);
  var firstMatrix = matrices.shift();

  var outputMatrix = firstMatrix.clone();
  outputMatrix.divide.apply(outputMatrix, matrices);

  return outputMatrix;
};

/**
 * Clone this matrix to a new instance.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.prototype.clone = function() {
  var rows = this.rows;
  var numRows = rows.length;
  var numCols = rows[0].length;
  var newRows = new Array(numRows);

  for (var row = 0; row < numRows; row++) {
    var matrixRow = rows[row];
    newRows[row] = new Array(numCols);
    for (var col = 0; col < numCols; col++) {
      newRows[row][col] = matrixRow[col];
    }
  }

  return new Matrix(newRows);
};

/**
 * Add matrices together into this matrix.
 *
 * @param {...Matrix} var_args At least one Matrix instance. If many,
 *     use multiple arguments.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.add = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);

  var numCols = this.rows[0].length;
  var numRows = this.rows.length;

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {

    // Get the number of rows and columns for the current matrix
    var matrixRows = matrices[i].rows;
    var numRowsInput = matrixRows.length;
    var numColsInput = matrixRows[0].length;

    // The size of the matrices must match
    if (numColsInput !== numCols || numRowsInput !== numRows) {
      continue;
    }

    // Loop through all rows
    for (var row = 0; row < numRows; row++) {
      var matrixRow = matrixRows[row];

      // Loop through all columns in that row
      for (var col = 0; col < numCols; col++) {

        // Add the number in that position
        this.rows[row][col] += matrixRow[col];
      }
    }
  }

  return this;
};

/**
 * Subtract matrices from this matrix.
 *
 * @param {...Matrix} var_args At least one Matrix instance. If many,
 *     use multiple arguments.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.subtract = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);

  var numCols = this.rows[0].length;
  var numRows = this.rows.length;

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {

    // Get the number of rows and columns for the current matrix
    var matrixRows = matrices[i].rows;
    var numRowsInput = matrixRows.length;
    var numColsInput = matrixRows[0].length;

    // The size of the matrices must match
    if (numColsInput !== numCols || numRowsInput !== numRows) {
      continue;
    }

    // Loop through all rows
    for (var row = 0; row < numRows; row++) {

      // Loop through all columns in that row
      var matrixRow = matrixRows[row];
      for (var col = 0; col < numCols; col++) {

        // Subtract the number in that position
        this.rows[row][col] -= matrixRow[col];
      }
    }
  }

  return this;
};

/**
 * Multiply matrices into this matrix.
 *
 * @param {...Matrix|number} var_args At least one Matrix instance or a number.
 *     If many, use multiple arguments. If a number, it will make a scalar
 *     multiplication.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.multiply = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);

  var newRows = this.rows;

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {
    var matrix = matrices[i];

    // Get the number of rows and columns for the target matrix
    var rowsInTarget = newRows.length;
    var colsInTarget = newRows[0].length;

    // A number means we should do a scalar multiplication.
    if (typeof matrix === 'number') {
      var scale = matrix;

      // Loop through all rows
      for (var row = 0; row < rowsInTarget; row++) {
        var matrixRow = newRows[row];

        // Loop through all columns in that row
        for (var col = 0; col < colsInTarget; col++) {

          // Multiply the number in that position
          var factor = 1 / scale; // Used to not get floating point errors
          matrixRow[col] = matrixRow[col] * (scale * factor) / factor;
        }
      }

      // Break this iteration here and continue with next matrix
      continue;
    }

    // Get the number of rows and columns for the current matrix
    var matrixRows = matrix.rows;
    var rowsInCurrent = matrixRows.length;
    var colsInCurrent = matrixRows[0].length;

    // The number of rows must match the number of columns in the first matrix
    if (colsInTarget !== rowsInCurrent) {
      continue;
    }

    // Create a temporary data array.
    // This will be used to store values in while reading from newRows.
    var tempData = new Array(newRows.length);

    // Loop through each row from the first matrix
    for (var row = 0; row < rowsInTarget; row++) {

      // For each row, loop through all columns in second matrix
      for (var currentCol = 0; currentCol < colsInCurrent; currentCol++) {

        // For each column, loop through each row in the second matrix
        for (var currentRow = 0; currentRow < rowsInCurrent; currentRow++) {

          // Create initial values when they don't exist
          if (!tempData[row]) tempData[row] = new Array(colsInCurrent);
          if (!tempData[row][currentCol]) tempData[row][currentCol] = 0;

          // Calculate the product of the number at the current position in the first matrix
          // and the current position in the second matrix. Add the product to the previous
          // value at the current position in the output data array.
          tempData[row][currentCol] += newRows[row][currentRow] * matrixRows[currentRow][currentCol];
        }
      }
    }

    // Save the temporary data array in newRows, so that the next matrix can be applied
    // to the output of this iteration instead of the original data.
    newRows = tempData;
  }

  // Set the new data for this Matrix instance
  this.rows = newRows;

  return this;
};

/**
 * Divide matrices from this matrix.
 * The matrices must be square.
 *
 * @param {...Matrix} var_args At least one Matrix instance. If many,
 *     use multiple arguments.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.divide = function(var_args) {
  var matrices = Array.prototype.slice.call(arguments);

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {
    var matrix = matrices[i];

    // The matrix must be square. If it's not, remove the
    // matrix from the list.
    if (matrix.rows.length !== matrix.rows[0].length) {
      matrices.splice(i, 1);
      i--; l--;
      continue;
    }

    // To divide matrices, you multiply by the inverse.
    // So we first store the inverse of all matrices.
    matrices[i] = matrix.clone().invert();
  }

  // Multiply this matrix with the inverse of all the other matrices
  this.multiply.apply(this, matrices);

  return this;
};

/**
 * Raise the matrix to a given power.
 *
 * @param {number} power The power to raise it to.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.power = function(power) {

  // Matrices that are not square can't be raised
  if (this.rows.length !== this.rows[0].length) {
    return this;
  }

  var matrices = new Array(power - 1);
  for (var i = 0, l = matrices.length; i < l; i++) {
    matrices[i] = this.clone();
  }

  this.multiply.apply(this, matrices);

  return this;
};

/**
 * Transpose the matrix.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.transpose = function() {
  var rows = this.rows;
  var numRows = rows.length;
  var numCols = rows[0].length;

  var newRows = new Array(numCols);

  for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
      if (!newRows[col]) newRows[col] = new Array(rows);
      newRows[col][row] = rows[row][col];
    }
  }

  this.rows = newRows;

  return this;
};

/**
 * Invert the matrix.
 * This only works if it is a square matrix. If it is not,
 * the matrix will stay the same.
 * For this to work, the determinant of the matrix must not
 * be zero. If it is, the matrix will stay the same.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.invert = function() {
  var rows = this.rows;
  var numRows = rows.length;
  var numCols = rows[0].length;

  // The matrix must be square
  if (numRows !== numCols) return this;

  var col; // Used in loop further down
  var removeColumn = function(row) {
    row.splice(col, 1); return row;
  };

  var matrixOfMinors = new Matrix(numRows, numCols);
  var matrixOfMinorsData = matrixOfMinors.rows;

  // Loop through each number in the matrix
  var i = 0;
  for (var row = 0; row < numRows; row++) {
    for (col = 0; col < numCols; col++) {

      // We need to get the determinant of the matrix made by the area
      // that is not in the current number's row or column. To do this,
      // we remove the first row and the column where the number is.
      var matrix = this.clone();
      matrix.rows.splice(row, 1);
      matrix.rows.map(removeColumn);

      // Set the determinant in the correct position in the matrix of minors.
      // Every other position is multiplied by -1 to get a matrix of cofactors.
      matrixOfMinorsData[row][col] = (i % 2 ? -1 : 1) * matrix.getDeterminant();

      i++;
    }
  }

  // Transpose the cofactor matrix of minors to get the adjugate matrix
  matrixOfMinors.transpose();

  // Get the determinant of the original matrix.
  // This could be done with the getDeterminant method, but this is faster.
  var originalDeterminant = 0;
  for (var n = 0; n < numCols; n++) {
    originalDeterminant += rows[0][n] * matrixOfMinorsData[0][n];
  }

  // Cancel everything if the determinant is zero, since inversion can't be done then
  if (originalDeterminant === 0) return this;

  this.rows = matrixOfMinors.multiply(1 / originalDeterminant).rows;

  return this;
};

/**
 * Get the determinant of the matrix, if possible.
 *
 * @return {number?} The determinant. The matrix must be square for
 *     this to be possible, so if it's not, this will return null.
 */
Matrix.prototype.getDeterminant = function() {
  var rows = this.rows;
  var size = rows.length;

  // The matrix must be square
  if (size !== rows[0].length) return null;

  // For a 1x1 matrix ( [[a]] ), the determinant is: a
  if (size === 1) {
    return rows[0][0];
  }

  // For a 2x2 matrix ( [[a, b], [c, d]] ), the determinant is: a*d - b*c
  if (size === 2) {
    return rows[0][0] * rows[1][1] - rows[0][1] * rows[1][0];
  }

  // For a 3x3 matrix ( [[a, b, c], [d, e, f], [g, h, i]] ), the determinant
  // is: a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
  if (size === 3) {
    var a = rows[0][0];
    var b = rows[0][1];
    var c = rows[0][2];
    var d = rows[1][0];
    var e = rows[1][1];
    var f = rows[1][2];
    var g = rows[2][0];
    var h = rows[2][1];
    var i = rows[2][2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  // For 4x4 or larger matrices
  if (size >= 4) {

    var n; // Used in loop further down
    var removeColumn = function(row) {
      row.splice(n, 1); return row;
    };

    var result = 0;

    // Loop through each number for the first row
    for (n = 0; n < size; n++) {

      // We need to get the determinant of the matrix made by the area
      // that is not in the current number's row or column. To do this,
      // we remove the first row and the column where the number is.
      var matrix = this.clone();
      matrix.rows.shift();
      matrix.rows.map(removeColumn);
      result += (n % 2 ? -1 : 1) * rows[0][n] * matrix.getDeterminant();
    }

    return result;
  }
};

/**
 * Tests if the data of the matrix is the same as the input.
 *
 * @param {Matrix|Array} input Another Matrix instance or an array of rows.
 *
 * @return {Boolean} True if it's the same.
 */
Matrix.prototype.equals = function(input) {
  var thisRows = this.rows;
  var inputRows = input instanceof Matrix ? input.rows : input;
  var numRowsThis = thisRows.length;
  var numColsThis = thisRows[0].length;
  var numRowsInput = inputRows.length;
  var numColsInput = inputRows[0].length;

  // If the size does not match, it is not equal
  if (numRowsThis !== numRowsInput || numColsThis !== numColsInput) {
    return false;
  }

  // Check each number and return false if something doesn't match
  for (var row = 0; row < numRowsThis; row++) {
    for (var col = 0; col < numColsThis; col++) {
      if (thisRows[row][col] !== inputRows[row][col]) return false;
    }
  }

  // If it hasn't returned before, everything matches and is the same
  return true;
};

module.exports = Matrix;
