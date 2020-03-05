QUnit.module('MAIN MODULE')  // group all these tests together

QUnit.test('TEST calculate volume', assert => {
    
    const width = window.document.getElementById("width");
    const height = window.document.getElementById("height");
    const length= window.document.getElementById("length");

    
    // sets the input values
    console.log(width ? "not null" : "null");

    width.value = "3";
    height.value = "3";
    length.value = "3";
    assert.equal(calculateVolume(parseInt(width.value), parseInt(height.value), parseInt(length.value)), 3 * 3 * 3, 'Positive integers');
    
    
    // sets the input values
    height.value = "1";
    width.value = "10";
    length.value = "10";
    assert.equal(calculateVolume(parseInt(width.value), parseInt(height.value), parseInt(length.value)), 1 * 10 * 10, 'Positive integers 2');
    
    // sets the input values
    height.value = "10";
    width.value = "10";
    length.value = "10";
    assert.equal(calculateVolume(parseInt(width.value), parseInt(height.value), parseInt(length.value)), 10 * 10 * 10, 'Positive integers 3');
    
    // sets the input values
    height.value = "1";
    width.value = "2";
    length.value = "3";
    assert.equal(calculateVolume(parseInt(width.value), parseInt(height.value), parseInt(length.value)), 3 * 2 * 1, "Positive integers 4");
    
    // sets the input values
    height.value = "87";
    width.value = "67";
    length.value = "10";
    assert.equal(calculateVolume(parseInt(width.value), parseInt(height.value), parseInt(length.value)),  87 * 67 * 10, 'Positive integers 5');
    
})

QUnit.config.autostart = false  // sync = false; start after loading html

// This script, called when the page loads, reaches out to the app that we wish to test
// It basically pastes the contents of that page into *this* web page, whew! This shows
// how we manipulate the DOM.

// The openingTag and closingTag specify which part of the original app's web page that we grab here
// Pretty slick eh?

window.addEventListener('load', () => {
  const appURL = '../volume_calculator.html' // reach out to the html for the app (js-gui)
  const openingTag = '<main>'
  const closingTag = '</main>' // go grab it!
  fetch(appURL, { method: 'GET' })
    .then(async (response) => {
      return await response.text() // returns promise
    })
    .then(txt => {                
      const start = txt.indexOf(openingTag)
      const end = txt.indexOf(closingTag) + closingTag.length
      const html = txt.substring(start, end) // we only want part of the page
      const qunitFixtureBody = document.querySelector('#qunit-fixture')
      qunitFixtureBody.innerHTML = html // put the page into the DOM - the second div associated with this page
      console.info(qunitFixtureBody) // print it out so we can see it (it doesn't get inserted into the page)
      QUnit.start() // start the actual testing - it finds and runs both the tests, defined in QUnit.test()
    })
    .catch(error => {
      console.error('error:', error);
      QUnit.start()
    })
})

/*
QUnit.test("TEST first number validation", assert => {
  const input = document.querySelector('#firstNumber')
  const warning = document.querySelector('#firstWarning')
  input.value = -3;
  assert.equal(input.value, -3, "Bad value assigned")
  assert.strictEqual(input.checkValidity(), false, "Correctly fails validation")
  input.focus()
  input.blur()
    this.hello = "hello";
    console.log(this.hello);
    console.log("" == false);
  assert.strictEqual(warning.innerHTML, 'Invalid input', `Correctly adds warning ${warning}`)
})
*/
