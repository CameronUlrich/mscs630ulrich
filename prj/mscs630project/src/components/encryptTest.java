import java.util.ArrayList;


/*
 * AESCipher Class:
 * 
 * This class implements a method with the following signature 
 * String[] roundKeysHex = aesRoundKeys(String KeyHex) that will produce 11 
 * round charKeyArrays (one in every element of the string array)
 */

public class encryptTest {
  
  private static int[] initialSBox = new int[] {
      0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
      0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
      0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
      0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
      0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
      0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
      0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
      0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
      0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
      0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
      0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
      0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
      0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
      0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
      0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
      0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
  };
  
  private static int[] invSBox = new int[] {
      0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
      0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
      0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
      0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
      0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
      0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
      0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
      0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
      0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
      0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
      0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
      0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
      0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
      0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
      0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
      0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
  };
  
  private static int[] rCon = new int[] {
      0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
      0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39,
      0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
      0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
      0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef,
      0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc,
      0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b,
      0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3,
      0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
      0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20,
      0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35,
      0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
      0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04,
      0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63,
      0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
      0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d
  };

  /*
   * aesRoundKeys function:
   * The input, KeyHex, is a length 16-hex string representation 
   * of the system charKeyArray Ke. The output, roundKeysHex, will be an 
   * 11-row string array representation of all the round charKeyArrays. 
   * Each element of roundKeysHex will contain a 16-hex string 
   * corresponding to each round charKeyArray.
   * 
   */
  
  private static String[] aesRoundKeys(String keyHex) {

    //make sure the sring is 32 length
    if (keyHex.length() != 32)
      return new String[]{"Please enter a hex string with a length of 32"};

    // array that will hold the keys:
    String[] numKeys = new String[11];

    // Used to create a 44x4 hex matrix:
    String[][] w = createMatrix(keyHex, 4, 44);

    
    for (int j = 4; j < w[0].length; j++) {

      // Check if j is a multiple of 4
      if (j % 4 != 0)
        for (int k = 0; k < w.length; k++)
          w[k][j] = XOr(w[k][j - 4], w[k][j - 1]);

      
      else {

        
        String rCon = aesRCon(j / 4);

        // Temporary matrix to hold the new values
        String[] tempMatrix = new String[4];

        // Create a new array with the elements from the last column
        for (int k = 0; k < 4; k++)
          tempMatrix[k] = w[k][j - 1];

        // Shift on the new array:
        tempMatrix = AESShift(tempMatrix);

        // Use SBox
        for (int k = 0; k < 4; k++)
          tempMatrix[k] = transformSBox(Integer.parseInt(tempMatrix[k], 16));

        // XOR
        tempMatrix[0] = XOr(rCon, tempMatrix[0]);

        // Column j becomes the values of array XOR with column j - 4:
        for (int k = 0; k < w.length; k++)
          w[k][j] = XOr(w[k][j - 4], tempMatrix[k]);
      }
    }

    // Convert to secure keys
    int counter = 0;
    while (counter != 44) {
      String[][] matrix = new String[4][4];
      for (int i = 0; i < w.length; i++)
        for (int j = 0; j < w.length; j++)
          matrix[j][i] = w[j][i + counter];

      numKeys[counter / 4] = createString(matrix).toUpperCase();
      counter += 4;
    }
    return numKeys;
  }
  
  /*
   * XOr method:
   * 
   * Returns the XOR process in hex.
   *
   */
  private static String XOr(String first, String second) {

    int a = Integer.parseInt(first, 16);
    int b = Integer.parseInt(second, 16);
    String value = Integer.toHexString(a ^ b);
    if (value.length() < 2)
      return "0" + value;
    else
      return value;
  }
  
  private static String aesRCon(int round) {

    return Integer.toHexString(rCon[round]);
  }
  
  /*
   * changeBackSBox method:
   *  
   *  Returns inversed SBox value for the specified nibble in AES.
   */
  private static String changeBackSBox(int inHex) {

    return Integer.toHexString(invSBox[inHex]);
  }


  /*
   * transformSBox method:
   * 
   * Returns the SBox value for the specified nibble in AES
   */
  private static String transformSBox(int inHex) {

    return Integer.toHexString(initialSBox[inHex]);
  }

  


  /*
   * AESShift method:
   * 
   * Performs the shift done in AES.
   */
  private static String[] AESShift(String[] stringArray) {

    return new String[]{stringArray[1], stringArray[2], stringArray[3], stringArray[0]};
  }

  /*
   * createString method:
   * 
   * Converts 4x4 matrix back to 32 hex string.
   */
  private static String createString(String[][] matrix) {

    StringBuilder string = new StringBuilder();
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        string.append(matrix[j][i]);

    return string.toString();
  }

  /*
   * createMatrix method:
   * 
   * Converts a hex string to a matrix.
   */
  private static String[][] createMatrix(String hexString, int row, int col) {

    // Add the hex values of characters to an ArrayList
    ArrayList<Character> charValues = new ArrayList<>();
    for (char a : hexString.toCharArray())
      charValues.add(a);

    
    String[][] newMatrix = new String[row][col];
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        newMatrix[j][i] = charValues.remove(0).toString() + charValues.remove(0).toString();

    
    return newMatrix;
  }

  /*
   * AESStateXOR method:
   * 
   *  Performs the "Add Round Key" operation; that is, the entries of 
   *  the output matrix are simply the XOR of the corresponding input matrix entries.
   */
  private static String[][] AESStateXOR(String[][] sHex, String[][] keyHex) {
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        sHex[i][j] = XOr(sHex[i][j], keyHex[i][j]);

    return sHex;
  }

  /*
   * AESNibbleSub method:
   * 
   * The method will perform the "Substitution" operation, i.e., the entries 
   * of the output matrix result from running the corresponding input matrix 
   * entries through the AES S-Box
   */
  private static String[][] AESNibbleSub(String[][] inStateHex) {

    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        inStateHex[i][j] = transformSBox(Integer.parseInt(inStateHex[i][j], 16));
    return inStateHex;
  }

  /*
   * AESShiftRow method:
   * 
   * Performs the Shift Row operation of the AES to transform the 
   * input state matrix into output state
   */
  private static String[][] AESShiftRow(String[][] inStateHex) {

    String[][] tempMatrix = new String[4][4];
    for (int index = 0; index < 4; index++) {

      tempMatrix[0][index] = inStateHex[0][index];
      tempMatrix[1][index] = inStateHex[1][(index + 1) % 4];
      tempMatrix[2][index] = inStateHex[2][(index + 2) % 4];
      tempMatrix[3][index] = inStateHex[3][(index + 3) % 4];
    }
    return tempMatrix;
  }

  /*
   * AESMixColumn method:
   * 
   * Performs the Mix Column operation of AES to 
   * transform the input state into output state.
   */
  private static String[][] AESMixColumn(String[][] inStateHex) {

    
    int newMatrix[][] = new int[4][4];
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        newMatrix[i][j] = Integer.parseInt(inStateHex[i][j], 16);

    // XOR
    for (int c = 0; c < 4; c++) {
      inStateHex[0][c] = Integer.toHexString(
              galoisMult(0x02, newMatrix[0][c]) ^ galoisMult(0x03, newMatrix[1][c]) ^ newMatrix[2][c] ^ newMatrix[3][c]).toUpperCase();
      inStateHex[1][c] = Integer.toHexString(
          newMatrix[0][c] ^ galoisMult(0x02, newMatrix[1][c]) ^ galoisMult(0x03, newMatrix[2][c]) ^ newMatrix[3][c]).toUpperCase();
      inStateHex[2][c] = Integer.toHexString(
          newMatrix[0][c] ^ newMatrix[1][c] ^ galoisMult(0x02, newMatrix[2][c]) ^ galoisMult(0x03, newMatrix[3][c])).toUpperCase();
      inStateHex[3][c] = Integer.toHexString(
              galoisMult(0x03, newMatrix[0][c]) ^ newMatrix[1][c] ^ newMatrix[2][c] ^ galoisMult(0x02, newMatrix[3][c])).toUpperCase();
    }

    
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++) {
        int length = inStateHex[i][j].length();
        if (length < 2)
          inStateHex[i][j] = "0" + inStateHex[i][j];
        if (length > 2)
          inStateHex[i][j] = "" + inStateHex[i][j].charAt(length - 2) + inStateHex[i][j].charAt(length - 1);
      }
    return inStateHex;
  }

  /*
   * galoisMult method:
   * 
   * Performs the Galois multiplication 
   */
  private static int galoisMult(int a, int b) {

    int p = 0;
    for (int c = 0; c < 8; c++) {
      if ((b & 1) != 0)
        p ^= a;

      boolean highBit = (a & 0x80) != 0;
      a <<= 1;
      if (highBit)
        a ^= 0x1b;
      b >>= 1;
    }

    return p;
  }

  /*
   * AES method:
   * 
   * Performs AES encryption following the algorithm 
   * we discussed in class and shown in Figure 1 (in pdf)
   */
  static String AES(String pTextHex, String keyHex) {

    /*
     * Convert to matrices
     */
    String[] keyArray = aesRoundKeys(keyHex);
    String[][] pTextMatrix = createMatrix(pTextHex, 4, 4);
    String[][] keyMatrix = createMatrix(keyArray[0], 4, 4);
    String[][] outStateHex = AESStateXOR(pTextMatrix, keyMatrix);

    /*
     * 
     * AESNibbleSub, AESShiftRow, AESMixColumn, AESStateXOR.
     */
    for (int key = 1; key < keyArray.length - 1; key++) {
      outStateHex = AESNibbleSub(outStateHex);
      outStateHex = AESShiftRow(outStateHex);
      outStateHex = AESMixColumn(outStateHex);
      keyMatrix = createMatrix(keyArray[key], 4, 4);
      outStateHex = AESStateXOR(outStateHex, keyMatrix);
    }

    /*
     * AESNibbleSub, AESShiftRow, AESStateXOR.
     */
    keyMatrix = createMatrix(keyArray[10], 4, 4);
    outStateHex = AESNibbleSub(outStateHex);
    outStateHex = AESShiftRow(outStateHex);
    outStateHex = AESStateXOR(outStateHex, keyMatrix);

    // Return the ciphertext:
    return createString(outStateHex).toUpperCase();
  }
  
  

}