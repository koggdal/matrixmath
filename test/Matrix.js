var expect = require('expect.js');
var Matrix = require('../Matrix');

describe('Matrix', function() {

  describe('Matrix constructor', function() {

    it('should take number arguments to create a matrix of a certain size', function() {
      var matrix = new Matrix(3, 4);
      expect(matrix instanceof Matrix).to.equal(true);
      expect(matrix.rows).to.equal(3);
      expect(matrix.cols).to.equal(4);
    });

    it('should have defaults for all arguments', function() {
      var matrix1 = new Matrix();
      expect(matrix1.rows).to.equal(0);
      expect(matrix1.cols).to.equal(0);

      var matrix2 = new Matrix(3);
      expect(matrix2.rows).to.equal(3);
      expect(matrix2.cols).to.equal(3);
    });

    it('should set initial data', function() {
      var matrix1 = new Matrix(3, 3);
      expect(matrix1[0]).to.equal(1);

      var matrix2 = new Matrix(3, 2);
      expect(matrix2[0]).to.equal(0);
    });

    it('should not set initial data if option says so', function() {
      var matrix1 = new Matrix(3, 3, false);
      expect(matrix1[0]).to.equal(undefined);

      var matrix2 = new Matrix(3, 2, false);
      expect(matrix2[0]).to.equal(undefined);
    });

  });

  describe('.add()', function() {

    var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
    var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
    var matrix3 = new Matrix(1, 3).setData([8, 10, 12]);
    var matrix4 = new Matrix(1, 3).setData([14, 16, 18]);
    var matrix5 = new Matrix(2, 3).setData([2, 4, 6, 2, 4, 8]);
    var matrix6 = new Matrix(1, 2).setData([4, 6]);

    it('should return an instance of Matrix', function() {
      var sum = Matrix.add(matrix1, matrix2);
      expect(sum instanceof Matrix).to.equal(true);
    });

    it('should add together two matrices of same size', function() {
      var sum = Matrix.add(matrix1, matrix2);
      expect(sum[0]).to.equal(3);
    });

    it('should not add together two matrices with different number of rows', function() {
      var sum = Matrix.add(matrix1, matrix5);
      expect(sum[0]).to.equal(1);
    });

    it('should not add together two matrices with different number of columns', function() {
      var sum = Matrix.add(matrix1, matrix6);
      expect(sum[0]).to.equal(1);
    });

    it('should add together all matrices passed in to the method (if same size)', function() {
      var sum = Matrix.add(matrix1, matrix2, matrix3, matrix4);
      expect(sum[0]).to.equal(25);
    });

  });

  describe('.subtract()', function() {

    var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
    var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
    var matrix3 = new Matrix(1, 3).setData([8, 10, 12]);
    var matrix4 = new Matrix(1, 3).setData([14, 16, 18]);
    var matrix5 = new Matrix(2, 3).setData([2, 4, 6, 2, 4, 8]);
    var matrix6 = new Matrix(1, 2).setData([4, 6]);

    it('should return an instance of Matrix', function() {
      var difference = Matrix.subtract(matrix1, matrix2);
      expect(difference instanceof Matrix).to.equal(true);
    });

    it('should subtract two matrices of same size', function() {
      var difference = Matrix.subtract(matrix1, matrix2);
      expect(difference[1]).to.equal(-2);
    });

    it('should not subtract two matrices with different number of rows', function() {
      var difference = Matrix.subtract(matrix1, matrix5);
      expect(difference[0]).to.equal(1);
    });

    it('should not subtract two matrices with different number of columns', function() {
      var difference = Matrix.subtract(matrix1, matrix6);
      expect(difference[0]).to.equal(1);
    });

    it('should subtract all matrices passed in to the method (if same size)', function() {
      var difference = Matrix.subtract(matrix1, matrix2, matrix3, matrix4);
      expect(difference[0]).to.equal(-23);
    });

  });

  describe('.multiply()', function() {

    var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
    var matrix2 = new Matrix(2, 2).setData([2, 4, 6, 8]);
    var matrix3 = new Matrix(2, 2).setData([3, 6, 9, 12]);
    var matrix4 = new Matrix(1, 3).setData([8, 10, 12]);

    it('should return an instance of Matrix', function() {
      var product = Matrix.multiply(matrix1, matrix2);
      expect(product instanceof Matrix).to.equal(true);
    });

    it('should multiply two square matrices of the same size', function() {
      var product = Matrix.multiply(matrix1, matrix2);
      expect(product[1]).to.equal(20);
    });

    it('should multiply a matrix with a number', function() {
      var product = Matrix.multiply(matrix1, 3);
      expect(product[0]).to.equal(3);
      expect(product[1]).to.equal(6);
      expect(product[2]).to.equal(9);
      expect(product[3]).to.equal(12);
    });

    it('should not multiply matrices where the number of columns in first one does not match rows in second', function() {
      var product = Matrix.multiply(matrix1, matrix4);
      expect(product[1]).to.equal(2);
    });

    it('should multiply all matrices passed in to the method', function() {
      var product = Matrix.multiply(matrix1, matrix2, matrix3);
      expect(product[1]).to.equal(324);
    });

  });

  describe('.divide()', function() {

    var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
    var matrix2 = new Matrix(2, 2).setData([2, 0, 0, 2]);
    var matrix3 = new Matrix(2, 2).setData([4, 0, 0, 4]);
    var matrix4 = new Matrix(2, 3).setData([2, 0, 1, 0, 2, 1]);

    it('should return an instance of Matrix', function() {
      var quotient = Matrix.divide(matrix1, matrix2);
      expect(quotient instanceof Matrix).to.equal(true);
    });

    it('should divide two square matrices of the same size', function() {
      var quotient = Matrix.divide(matrix1, matrix2);
      expect(quotient[0]).to.equal(0.5);
    });

    it('should not divide matrices that are not square', function() {
      var quotient = Matrix.divide(matrix1, matrix4);
      expect(quotient[0]).to.equal(1);
    });

    it('should divide all matrices passed in to the method', function() {
      var quotient = Matrix.divide(matrix1, matrix2, matrix3);
      expect(quotient[0]).to.equal(0.125);
    });

  });

  describe('#setEmptyData()', function() {

    var matrix1 = new Matrix(2, 2);

    it('should set all values to 0', function() {
      expect(matrix1[0]).to.equal(1);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(1);

      matrix1.setEmptyData();

      expect(matrix1[0]).to.equal(0);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(0);
    });

  });

  describe('#setIdentityData()', function() {

    var matrix1 = new Matrix(2, 2, false);
    matrix1.setEmptyData();

    it('should set all values to 0', function() {
      expect(matrix1[0]).to.equal(0);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(0);

      matrix1.setIdentityData();

      expect(matrix1[0]).to.equal(1);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(1);
    });

  });

  describe('#setData()', function() {

    it('should set the passed in values as data', function() {
      var matrix1 = new Matrix(2, 2, false);

      expect(matrix1[0]).to.equal(undefined);
      expect(matrix1[1]).to.equal(undefined);
      expect(matrix1[2]).to.equal(undefined);
      expect(matrix1[3]).to.equal(undefined);

      matrix1.setData([4, 6, 7, 8]);

      expect(matrix1[0]).to.equal(4);
      expect(matrix1[1]).to.equal(6);
      expect(matrix1[2]).to.equal(7);
      expect(matrix1[3]).to.equal(8);
    });

    it('should not set the values if the length is different, but no size hint provided', function() {
      var matrix1 = new Matrix(2, 2, false);

      expect(matrix1[0]).to.equal(undefined);
      expect(matrix1[1]).to.equal(undefined);
      expect(matrix1[2]).to.equal(undefined);
      expect(matrix1[3]).to.equal(undefined);

      matrix1.setData([4, 6, 7, 8, 9, 3]);

      expect(matrix1[0]).to.equal(undefined);
      expect(matrix1[1]).to.equal(undefined);
      expect(matrix1[2]).to.equal(undefined);
      expect(matrix1[3]).to.equal(undefined);
    });

    it('should set the values if the length is different, and size hint provided', function() {
      var matrix1 = new Matrix(2, 2, false);

      expect(matrix1[0]).to.equal(undefined);
      expect(matrix1[1]).to.equal(undefined);
      expect(matrix1[2]).to.equal(undefined);
      expect(matrix1[3]).to.equal(undefined);

      matrix1.setData([4, 6, 7, 8, 9, 3], 3, 2);

      expect(matrix1[0]).to.equal(4);
      expect(matrix1[1]).to.equal(6);
      expect(matrix1[2]).to.equal(7);
      expect(matrix1[3]).to.equal(8);
      expect(matrix1[4]).to.equal(9);
      expect(matrix1[5]).to.equal(3);

      expect(matrix1.length).to.equal(6);
      expect(matrix1.rows).to.equal(3);
      expect(matrix1.cols).to.equal(2);
    });

    it('should clean out previous data', function() {
      var matrix1 = new Matrix(3, 3);

      expect(matrix1[0]).to.equal(1);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(0);
      expect(matrix1[4]).to.equal(1);
      expect(matrix1[5]).to.equal(0);
      expect(matrix1[6]).to.equal(0);
      expect(matrix1[7]).to.equal(0);
      expect(matrix1[8]).to.equal(1);

      matrix1.setData([4, 6, 7, 8], 2, 2);

      expect(matrix1[0]).to.equal(4);
      expect(matrix1[1]).to.equal(6);
      expect(matrix1[2]).to.equal(7);
      expect(matrix1[3]).to.equal(8);
      expect(matrix1[4]).to.equal(undefined);
      expect(matrix1[5]).to.equal(undefined);
      expect(matrix1[6]).to.equal(undefined);
      expect(matrix1[7]).to.equal(undefined);
      expect(matrix1[8]).to.equal(undefined);

      expect(matrix1.length).to.equal(4);
      expect(matrix1.rows).to.equal(2);
      expect(matrix1.cols).to.equal(2);
    });

  });

  describe('#getData()', function() {

    var matrix1 = new Matrix(2, 2);

    it('should get all the values as an array', function() {
      var data = matrix1.getData();

      expect(data[0]).to.equal(1);
      expect(data[1]).to.equal(0);
      expect(data[2]).to.equal(0);
      expect(data[3]).to.equal(1);
    });

    it('should expose the number of rows and columns on the array', function() {
      var data = matrix1.getData();

      expect(data.rows).to.equal(2);
      expect(data.cols).to.equal(2);
    });

  });

  describe('#clone()', function() {

    var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
    var clone = matrix1.clone();

    it('should return an instance of Matrix', function() {
      expect(clone instanceof Matrix).to.equal(true);
    });

    it('should return a new instance', function() {
      expect(clone).to.not.equal(matrix1);
    });

    it('should return an instance with the same data', function() {
      expect(clone[0]).to.equal(matrix1[0]);
      expect(clone[1]).to.equal(matrix1[1]);
      expect(clone[2]).to.equal(matrix1[2]);
      expect(clone[3]).to.equal(matrix1[3]);
    });

  });

  describe('#add()', function() {

    it('should add another matrix of the same size', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      matrix1.add(matrix2);
      expect(matrix1[0]).to.equal(3);
    });

    it('should not add a matrix with a different number of rows', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(2, 3).setData([2, 4, 6, 2, 4, 8]);
      matrix1.add(matrix2);
      expect(matrix1[0]).to.equal(1);
    });

    it('should not add a matrix with a different number of columns', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 2).setData([4, 6]);
      matrix1.add(matrix2);
      expect(matrix1[0]).to.equal(1);
    });

    it('should add together all matrices passed in to the method (if same size)', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      var matrix3 = new Matrix(1, 3).setData([8, 10, 12]);
      var matrix4 = new Matrix(1, 3).setData([14, 16, 18]);
      matrix1.add(matrix2, matrix3, matrix4);
      expect(matrix1[0]).to.equal(25);
    });

    it('should return the instance', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      var returnValue = matrix1.add(matrix2);
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#subtract()', function() {

    it('should subtract another matrix of same size', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      matrix1.subtract(matrix2);
      expect(matrix1[1]).to.equal(-2);
    });

    it('should not subtract a matrix with a different number of rows', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(2, 3).setData([2, 4, 6, 2, 4, 8]);
      matrix1.subtract(matrix2);
      expect(matrix1[0]).to.equal(1);
    });

    it('should not subtract a matrix with a different number of columns', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 2).setData([4, 6]);
      matrix1.subtract(matrix2);
      expect(matrix1[0]).to.equal(1);
    });

    it('should subtract all matrices passed in to the method (if same size)', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      var matrix3 = new Matrix(1, 3).setData([8, 10, 12]);
      var matrix4 = new Matrix(1, 3).setData([14, 16, 18]);
      matrix1.subtract(matrix2, matrix3, matrix4);
      expect(matrix1[0]).to.equal(-23);
    });

    it('should return the instance', function() {
      var matrix1 = new Matrix(1, 3).setData([1, 2, 3]);
      var matrix2 = new Matrix(1, 3).setData([2, 4, 6]);
      var returnValue = matrix1.subtract(matrix2);
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#multiply()', function() {

    it('should multiply another square matrix of the same size', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      var matrix2 = new Matrix(2, 2).setData([2, 4, 6, 8]);
      matrix1.multiply(matrix2);
      expect(matrix1[1]).to.equal(20);
    });

    it('should multiply the matrix with a number', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      matrix1.multiply(3);
      expect(matrix1[0]).to.equal(3);
      expect(matrix1[1]).to.equal(6);
      expect(matrix1[2]).to.equal(9);
      expect(matrix1[3]).to.equal(12);
    });

    it('should not multiply a matrix where the number of columns in first one does not match rows in second', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      var matrix2 = new Matrix(1, 3).setData([8, 10, 12]);
      matrix1.multiply(matrix2);
      expect(matrix1[1]).to.equal(2);
    });

    it('should multiply all matrices passed in to the method', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      var matrix2 = new Matrix(2, 2).setData([2, 4, 6, 8]);
      var matrix3 = new Matrix(2, 2).setData([3, 6, 9, 12]);
      matrix1.multiply(matrix2, matrix3);
      expect(matrix1[1]).to.equal(324);
    });

    it('should multiply a number', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      matrix1.multiply(3);
      expect(matrix1[1]).to.equal(6);
    });

    it('should return the instance', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 3, 4]);
      var matrix2 = new Matrix(2, 2).setData([2, 4, 6, 8]);
      var returnValue = matrix1.multiply(matrix2);
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#divide()', function() {

    it('should divide another square matrix of the same size', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
      var matrix2 = new Matrix(2, 2).setData([2, 0, 0, 2]);
      matrix1.divide(matrix2);
      expect(matrix1[0]).to.equal(0.5);
    });

    it('should not divide a matrix that is not square', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
      var matrix2 = new Matrix(2, 3).setData([2, 0, 1, 0, 2, 1]);
      matrix1.divide(matrix2);
      expect(matrix1[0]).to.equal(1);
    });

    it('should divide all matrices passed in to the method', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
      var matrix2 = new Matrix(2, 2).setData([2, 0, 0, 2]);
      var matrix3 = new Matrix(2, 2).setData([4, 0, 0, 4]);
      matrix1.divide(matrix2, matrix3);
      expect(matrix1[0]).to.equal(0.125);
    });

    it('should return the instance', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 0, 0, 1]);
      var matrix2 = new Matrix(2, 2).setData([2, 0, 0, 2]);
      var returnValue = matrix1.divide(matrix2);
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#power()', function() {

    it('should raise the matrix to a given power', function() {
      var matrix1 = new Matrix(2, 2).setData([1, 2, 4, 1]);
      matrix1.power(3);

      expect(matrix1[0]).to.equal(25);
      expect(matrix1[1]).to.equal(22);
      expect(matrix1[2]).to.equal(44);
      expect(matrix1[3]).to.equal(25);
    });

    it('should not raise non-square matrices', function() {
      var matrix1 = new Matrix(3, 2).setData([1, 2, 4, 1, 3, 2]);
      matrix1.power(3);

      expect(matrix1.rows).to.equal(3);
      expect(matrix1.cols).to.equal(2);
      expect(matrix1[0]).to.equal(1);
      expect(matrix1[1]).to.equal(2);
      expect(matrix1[2]).to.equal(4);
      expect(matrix1[3]).to.equal(1);
      expect(matrix1[4]).to.equal(3);
      expect(matrix1[5]).to.equal(2);
    });

  });

  describe('#transpose()', function() {

    var matrix1 = new Matrix(2, 2).setData([1, 2, 4, 1]);

    it('should transpose the matrix', function() {
      matrix1.transpose();

      expect(matrix1[0]).to.equal(1);
      expect(matrix1[1]).to.equal(4);
      expect(matrix1[2]).to.equal(2);
      expect(matrix1[3]).to.equal(1);
    });

    it('should return the instance', function() {
      var returnValue = matrix1.transpose();
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#invert()', function() {

    it('should invert a square matrix', function() {
      var matrix1 = new Matrix(3, 3).setData([3, 0, 2, 2, 0, -2, 0, 1, 1]);
      matrix1.invert();

      expect(matrix1[0]).to.equal(0.2);
      expect(matrix1[1]).to.equal(0.2);
      expect(matrix1[2]).to.equal(0);
      expect(matrix1[3]).to.equal(-0.2);
      expect(matrix1[4]).to.equal(0.3);
      expect(matrix1[5]).to.equal(1);
      expect(matrix1[6]).to.equal(0.2);
      expect(matrix1[7]).to.equal(-0.3);
      expect(matrix1[8]).to.equal(0);
    });

    it('should not invert a non-square matrix', function() {
      var matrix1 = new Matrix(3, 2).setData([3, 0, 2, 0, 0, 1]);
      matrix1.invert();

      expect(matrix1[0]).to.equal(3);
      expect(matrix1[1]).to.equal(0);
      expect(matrix1[2]).to.equal(2);
      expect(matrix1[3]).to.equal(0);
      expect(matrix1[4]).to.equal(0);
      expect(matrix1[5]).to.equal(1);
    });

    it('should not invert a matrix whose determinant is zero', function() {
      var matrix1 = new Matrix(2, 2).setData([3, 4, 6, 8]);
      var determinant = matrix1.getDeterminant();
      matrix1.invert();

      expect(determinant).to.equal(0);
      expect(matrix1[0]).to.equal(3);
      expect(matrix1[1]).to.equal(4);
      expect(matrix1[2]).to.equal(6);
      expect(matrix1[3]).to.equal(8);
    });

    it('should return the instance', function() {
      var matrix1 = new Matrix(3, 3).setData([3, 0, 2, 2, 0, -2, 0, 1, 1]);
      var returnValue = matrix1.invert();
      expect(returnValue).to.equal(matrix1);
    });

  });

  describe('#getDeterminant()', function() {

    it('should return null if the matrix is not square', function() {
      var matrix1 = new Matrix(3, 2).setData([3, 0, 2, 0, 0, 1]);
      var determinant = matrix1.getDeterminant();
      expect(determinant).to.equal(null);
    });

    it('should return the determinant of a 1x1 matrix', function() {
      var matrix1 = new Matrix(1, 1).setData([3]);
      var determinant = matrix1.getDeterminant();
      expect(determinant).to.equal(3);
    });

    it('should return the determinant of a 2x2 matrix', function() {
      var matrix1 = new Matrix(2, 2).setData([4, 6, 3, 8]);
      var determinant = matrix1.getDeterminant();
      expect(determinant).to.equal(14);
    });

    it('should return the determinant of a 3x3 matrix', function() {
      var matrix1 = new Matrix(3, 3).setData([6, 1, 1, 4, -2, 5, 2, 8, 7]);
      var determinant = matrix1.getDeterminant();
      expect(determinant).to.equal(-306);
    });

    it('should return the determinant of a 4x4 (or larger) matrix', function() {
      var matrix1 = new Matrix(4, 4).setData([6, 1, 1, 3, 4, -2, 5, 6, 2, 8, 7, -3, 6, 2, 4, 1]);
      var determinant = matrix1.getDeterminant();
      expect(determinant).to.equal(708);
    });

  });

  describe('#equals()', function() {

    var matrix1 = new Matrix(3, 2).setData([3, 0, 2, 0, 0, 1]);
    var matrix2 = new Matrix(3, 2).setData([3, 0, 2, 0, 0, 1]);
    var matrix3 = new Matrix(3, 2).setData([3, 0, 2, 5, 0, 1]);
    var matrix4 = new Matrix(2, 2).setData([3, 0, 2, 0]);

    it('should return false if the size is not the same', function() {
      expect(matrix1.equals(matrix4)).to.equal(false);
    });

    it('should return false if the matrices are not equal', function() {
      expect(matrix1.equals(matrix3)).to.equal(false);
    });

    it('should return true if the matrices are equal', function() {
      expect(matrix1.equals(matrix2)).to.equal(true);
    });

  });

});
