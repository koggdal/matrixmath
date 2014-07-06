/**
 * @module matrixmath/Matrix
 */
'use strict';

/**
 * @classdesc A class for representing and working with a mathematical matrix.
 *
 * @property {number} rows Number of rows.
 * @property {number} cols Number of cols.
 * @property {number} length Number of values.
 *
 * @constructor
 *
 * @param {number=} opt_rows The number of rows for the matrix. Default is 0.
 * @param {number=} opt_cols The number of columns for the matrix. Default is same
 *     amount of columns as rows.
 * @param {boolean=} opt_setInitial Whether to set the initial data when created.
 *     The initial data will be set to the identity matrix if it specifies the same
 *     amount of rows as columns. Default is true.
 *
 * @example
 * // Create a 3x3 matrix with data
 * var matrix = new Matrix(3, 3);
 * matrix.setData(
 *   1, 0, 0,
 *   0, 1, 0,
 *   0, 0, 1
 * );
 *
 * // Create a matrix filled with zeros
 * // The matrix will be 3 rows and 2 columns
 * var matrix = new Matrix(3, 2);
 *
 * // Create an identity matrix
 * // The matrix will be 3 rows and 3 columns
 * var matrix = new Matrix(3);
 *
 * // Create a matrix with no data set
 * // The matrix will be 3 rows and 3 columns
 * var matrix = new Matrix(3, 3, false);
 */
function Matrix(opt_rows, opt_cols, opt_setInitial) {
  this.rows = opt_rows || 0;
  this.cols = opt_cols || this.rows;
  this.length = this.rows * this.cols;
  this._cache = null;

  var setInitial = opt_setInitial === undefined ? true : opt_setInitial;

  if (setInitial) {
    if (this.rows === this.cols) {
      this.setIdentityData();
    } else {
      this.setEmptyData();
    }
  }
}

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
 * Set the data for this matrix to be only zeros.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.setEmptyData = function() {
  for (var i = 0, l = this.length; i < l; i++) {
    this[i] = 0;
  }

  return this;
};

/**
 * Set the data for this matrix to the identity data.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.setIdentityData = function() {
  for (var i = 0, l = this.length; i < l; i++) {
    this[i] = i % (this.cols + 1) ? 0 : 1;
  }

  return this;
};

/**
 * Set the data for this matrix.
 *
 * @param {Array.<number>} data An array of values (numbers). Alternatively,
 *     the data can be provided as separate arguments, but if so, the size
 *     must match the current size.
 * @param {number=} opt_rows Number of rows in the new data. If not provided,
 *     the data must match the size of the previous data.
 * @param {number=} opt_cols Number of columns in the new data. If not provided,
 *     the data must match the size of the previous data.
 *
 * @return {Matrix} This Matrix instance.
 */
Matrix.prototype.setData = function(data, opt_rows, opt_cols) {
  var i, l;
  var isArray = Array.isArray(data);

  if (!isArray) {
    data = arguments;
    opt_rows = undefined;
    opt_cols = undefined;
  }

  // If the number of values is different than before, and there was no hint
  // provided for the size of the new matrix data, we can't modify the data
  // safely, so we do nothing.
  if (data.length !== this.length) {
    if (opt_rows === undefined || opt_cols === undefined) {
      return this;
    } else if (opt_rows * opt_cols !== data.length) {
      return this;
    }
  }

  // Clean out previous data
  for (i = 0, l = this.length; i < l; i++) {
    delete this[i];
  }

  // Set new data
  for (i = 0, l = data.length; i < l; i++) {
    this[i] = data[i];
  }

  // Set new metadata
  this.length = data.length;
  this.rows = opt_rows || this.rows;
  this.cols = opt_cols || this.cols;

  return this;
};

/**
 * Get the data for this matrix as an array of numbers, with additional data
 * properties for rows and columns counts.
 *
 * @return {Array} An array of numbers, representing the data of the matrix.
 */
Matrix.prototype.getData = function() {
  var data = this.toArray();
  data.rows = this.rows;
  data.cols = this.cols;
  return data;
};

/**
 * Get the data for this matrix as a regular array.
 *
 * @return {Array} An array of numbers.
 */
Matrix.prototype.toArray = function() {
  var data = new Array(this.length);

  for (var i = 0, l = this.length; i < l; i++) {
    data[i] = this[i];
  }

  return data;
};

/**
 * Get the data for this matrix as a formatted string, which is useful for
 * logging and debugging. It will be formatted with line breaks to visualize
 * the rows and columns.
 *
 * @param {number|string=} opt_indentation Optional argument to control
 *     indentation in the output string. If set to a number, the indentation
 *     will be that many spaces wide. If it is a string, the indentation will be
 *     this string. It will default to two spaces.
 * @param {string=} opt_separator Optional argument to control what separates
 *     the values in the output string. It will default to two spaces.
 * @param {string=} opt_start String to start the output with. Default is '['.
 * @param {string=} opt_end String to end the output with. Default is ']'.
 *
 * @return {string} A string representation of the data.
 */
Matrix.prototype.toLogString = function(opt_indentation, opt_separator, opt_start, opt_end) {
  var array = this.toArray();

  var beginning;
  var sep;

  var separator = typeof opt_separator === 'string' ? opt_separator : '  ';
  var indentation = '  ';

  if (typeof opt_indentation === 'number') {
    indentation = (new Array(Math.max(0, opt_indentation) + 1)).join(' ');
  } else if (typeof opt_indentation === 'string') {
    indentation = opt_indentation;
  }

  var start = typeof opt_start === 'string' ? opt_start : '[';
  var end = typeof opt_end === 'string' ? opt_end : ']';

  var string = start;
  for (var i = 0, l = array.length; i < l; i++) {
    beginning = i % this.cols === 0 ? '\n' + indentation : '';
    sep = i % this.cols === this.cols - 1 ? '' : separator;
    string += beginning + array[i] + sep;
  }
  string += '\n' + end;

  return string;
};

/**
 * Clone this matrix to a new instance.
 *
 * @return {Matrix} A new matrix for the result.
 */
Matrix.prototype.clone = function() {
  var matrix = new Matrix(this.rows, this.cols);
  matrix.setData(this.getData());

  return matrix;
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
  var matrices = arguments;

  var numValues = this.length;

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {
    var matrix = matrices[i];

    // The size of the matrices must match
    if (matrix.cols !== this.cols || matrix.rows !== this.rows) {
      continue;
    }

    // Loop through all values
    for (var n = 0; n < numValues; n++) {

      // Add the number in that position
      this[n] += matrix[n];
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
  var matrices = arguments;

  var numValues = this.length;

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {
    var matrix = matrices[i];

    // The size of the matrices must match
    if (matrix.cols !== this.cols || matrix.rows !== this.rows) {
      continue;
    }

    // Loop through all values
    for (var n = 0; n < numValues; n++) {

      // Subtract the number in that position
      this[n] -= matrix[n];
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
  var matrices = arguments;

  var newRows = this.getData();

  // Loop through all the matrices passed to the method
  for (var i = 0, l = matrices.length; i < l; i++) {
    var matrix = matrices[i];

    // Get the number of rows and columns for the target matrix
    var rowsInTarget = newRows.rows;
    var colsInTarget = newRows.cols;
    var numValuesInTarget = newRows.length;

    // A number means we should do a scalar multiplication.
    if (typeof matrix === 'number') {
      var scale = matrix;
      var factor = 1 / scale; // Used to not get floating point errors

      // Loop through all values
      for (var n = 0; n < numValuesInTarget; n++) {

        // Multiply the number in that position
        newRows[n] = newRows[n] * (scale * factor) / factor;
      }

      // Break this iteration here and continue with next matrix
      continue;
    }

    // Get the number of rows and columns for the current matrix
    var rowsInCurrent = matrix.rows;
    var colsInCurrent = matrix.cols;

    // The number of rows must match the number of columns in the first matrix
    if (colsInTarget !== rowsInCurrent) {
      continue;
    }

    // Create a temporary data array.
    // This will be used to store values in while reading from newRows.
    var tempData = new Array(newRows.length);
    tempData.rows = newRows.rows;
    tempData.cols = matrix.cols;

    // Loop through each row from the first matrix
    for (var row = 0; row < rowsInTarget; row++) {

      // For each row, loop through all columns in second matrix
      for (var currentCol = 0; currentCol < colsInCurrent; currentCol++) {

        // For each column, loop through each row in the second matrix
        for (var currentRow = 0; currentRow < rowsInCurrent; currentRow++) {
          var outputIndex = row * tempData.cols + currentCol;

          // Create initial values when they don't exist
          if (!tempData[outputIndex]) tempData[outputIndex] = 0;

          // Calculate the product of the number at the current position in the first matrix
          // and the current position in the second matrix. Add the product to the previous
          // value at the current position in the output data array.
          tempData[outputIndex] += newRows[row * newRows.cols + currentRow] * matrix[currentRow * matrix.cols + currentCol];
        }
      }
    }

    // Save the temporary data array in newRows, so that the next matrix can be applied
    // to the output of this iteration instead of the original data.
    newRows = tempData;
  }

  // Set the new data for this Matrix instance
  this.setData(newRows, newRows.rows, newRows.cols);

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
    if (matrix.rows !== matrix.cols) {
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
  if (this.rows !== this.cols) {
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
  var numRows = this.rows;
  var numCols = this.cols;

  var newData = new Array(this.length);

  for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
      newData[col * numCols + row] = this[row * numCols + col];
    }
  }

  this.setData(newData);

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
  var numRows = this.rows;
  var numCols = this.cols;

  // The matrix must be square
  if (numRows !== numCols) return this;

  var removeRow = function(values, row, colsPerRow) {
    values.splice(row * colsPerRow, colsPerRow);
    return values;
  };

  var removeColumn = function(values, col, colsPerRow) {
    var newData = [];
    for (var i = 0, l = values.length; i < l; i++) {
      if (i % colsPerRow !== col) newData.push(values[i]);
    }
    return newData;
  };

  // By using a cache, only the first call to invert will cause a memory increase.
  var cache = this._cache || (this._cache = {});
  var matrixOfMinors = cache.matrixOfMinors || (cache.matrixOfMinors = new Matrix(numRows, numCols, false));
  var matrix = cache.tempMatrix || (cache.tempMatrix = new Matrix(this.rows, this.cols, false));

  // Loop through each number in the matrix
  var i = 0;
  for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {

      // We need to get the determinant of the matrix made by the area
      // that is not in the current number's row or column. To do this,
      // we remove the first row and the column where the number is.
      var newData = this.getData();
      newData = removeRow(newData, row, this.cols);
      newData = removeColumn(newData, col, this.cols);
      matrix.setData(newData, this.rows - 1, this.cols - 1);

      // Set the determinant in the correct position in the matrix of minors.
      // Every other position is multiplied by -1 to get a matrix of cofactors.
      matrixOfMinors[row * matrixOfMinors.cols + col] = (i % 2 ? -1 : 1) * matrix.getDeterminant();

      i++;
    }
  }

  // Get the determinant of the original matrix.
  // This could be done with the getDeterminant method, but this is faster.
  var originalDeterminant = 0;
  for (var n = 0; n < numCols; n++) {
    originalDeterminant += this[n] * matrixOfMinors[n];
  }

  // Cancel everything if the determinant is zero, since inversion can't be done then
  if (originalDeterminant === 0) return this;

  // Transpose the cofactor matrix of minors to get the adjugate matrix
  matrixOfMinors.transpose();

  // Multiply the matrix of minors with the inverse of the determinant,
  // to get the final inverse of the original matrix.
  var product = matrixOfMinors.multiply(1 / originalDeterminant);
  this.setData(product.getData(), product.rows, product.cols);

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
  var cols = this.cols;

  // The matrix must be square
  if (rows !== cols) return null;

  // For a 1x1 matrix ( [[a]] ), the determinant is: a
  if (rows === 1) {
    return this[0];
  }

  // For a 2x2 matrix ( [[a, b], [c, d]] ), the determinant is: a*d - b*c
  if (rows === 2) {
    return this[0] * this[3] - this[1] * this[2];
  }

  // For a 3x3 matrix ( [[a, b, c], [d, e, f], [g, h, i]] ), the determinant
  // is: a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
  if (rows === 3) {
    var a = this[0];
    var b = this[1];
    var c = this[2];
    var d = this[3];
    var e = this[4];
    var f = this[5];
    var g = this[6];
    var h = this[7];
    var i = this[8];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  // For 4x4 or larger matrices
  if (rows >= 4) {

    var removeRow = function(values, row, colsPerRow) {
      values.splice(row * colsPerRow, colsPerRow);
      return values;
    };

    var removeColumn = function(values, col, colsPerRow) {
      var newData = [];
      for (var i = 0, l = values.length; i < l; i++) {
        if (i % colsPerRow !== col) newData.push(values[i]);
      }
      return newData;
    };

    var result = 0;

    // By using a cache, only the first call to the method will cause a memory increase.
    var cache = this._cache || (this._cache = {});
    var matrix = cache.tempMatrix || (cache.tempMatrix = new Matrix(this.rows, this.cols, false));

    // Loop through each number for the first row
    for (var col = 0; col < cols; col++) {

      // We need to get the determinant of the matrix made by the area
      // that is not in the current number's row or column. To do this,
      // we remove the first row and the column where the number is.
      var newData = this.getData();
      newData = removeRow(newData, 0, this.cols);
      newData = removeColumn(newData, col, this.cols);
      matrix.setData(newData, this.rows - 1, this.cols - 1);

      result += (col % 2 ? -1 : 1) * this[col] * matrix.getDeterminant();
    }

    return result;
  }
};

/**
 * Tests if the data of the matrix is the same as the input.
 *
 * @param {Matrix} input Another Matrix instance.
 *
 * @return {Boolean} True if it's the same.
 */
Matrix.prototype.equals = function(input) {
  if (!(input instanceof Matrix)) return false;

  // If the size does not match, it is not equal
  if (this.rows !== input.rows || this.cols !== input.cols) {
    return false;
  }

  // Check each number and return false if something doesn't match
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] !== input[i]) return false;
  }

  // If it hasn't returned before, everything matches and is the same
  return true;
};

module.exports = Matrix;
