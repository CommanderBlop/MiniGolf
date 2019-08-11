/* -------------------------------------------------------------------
 *                          Mini-Golf V3.0
 *                           by Jack Long
 * -------------------------------------------------------------------
 */

/* -------------------------------------------------------------------
 *                         Declare Variables
 * 1. Choose different hole_number to get different courses.
 * 2. Modify the velocity and starting position to hit into the hole
 * 3. The smaller the delta_t, the smoother the motion
 * -------------------------------------------------------------------
 */

let deltaT = 1/20/*Your Input*/; //unit: s
let holeNumber = 1/*Your Input*/;
let startingPosition = 0/*Your Input*/; //unit: m (Only start in 0 - 100)
let velocity = 50/*Your Input*/; //unit: m/s

/* -------------------------------------------------------------------
 *                     Write the nextX() function
 * Write the nextX function below.
 * The function takes the x-position of golf ball and returns the new
 * x-position based on the velocity given.
 * -------------------------------------------------------------------
 */

function nextX(x/*parameter*/) {
  return x + velocity * deltaT;/*Your input*/
}

/* -------------------------------------------------------------------
 *                           Hole Info
 * 1. Distance: 200m        Open Time: 3.5s - 5.5s
 * 2. Distance: 350m        Open Time: 2s - 3.5s
 * 3. Distance: 425m        Open Time: 3s - 4s
 * 4. Distance: 575m        Open Time: 4s - 4.5s
 * 5. Distance: 400m        Open Time: 1.5s - 2s
 * 6. Distance: 225m        Open Time: 2.5s - 3s
 * 7. Distance: 150m        Open Time: 1s - 1.5s
 * 8. Distance: 690m        Open Time: 3s - 3.5s
 * 9. Distance: 500m        Open Time: 0.5s - 1s
 * -------------------------------------------------------------------
 */
