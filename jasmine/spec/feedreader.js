/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are within the $() function,
 * it will ensure test cases won't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* It tests to make sure that the allFeeds variable has been defined and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); //testing for the definition
            expect(allFeeds.length).not.toBe(0); //ensuring allFeeds contains some entries. If there is no entry, the length will be zero.
        });


        /* Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty. */
 		 it('all feeds have URL defined and have a non empty URL', function() { 
			allFeeds.forEach(function(feed) { 
				expect(feed.url).toBeDefined(); //testing for the definition
				expect(feed.url).toBeTruthy(); //ensuring the url is not empty. Non empty strings are true values. So matching for truthy values.
			});
		 });

        /* Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty. */
 		 it('all feeds have "name" defined and not empty', function() { 
			allFeeds.forEach(function(feed) { 
				expect(feed.name).toBeDefined(); //testing for the definition
				expect(feed.name).toBeTruthy();  //ensuring the name is not empty. Non empty strings are true values. So matching for truthy values.
			});
		 });		 
    });



	describe('The menu', function() {

        /* Test to ensure the menu element is hidden by default.  */
 		it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy(); // if the body element has the class menu-hidden, the menu will be hidden.
        });

         /* Test to ensure the menu changes visibility when the menu icon is clicked. 
          * This test has two expectations: 1. The menu should display when the menu icon is clicked
		  * 2. The menu should hide, when the menu icon is clicked with the menu is visible.
          */
		it('is displayed when clicked on menu icon', function() {
			$('.menu-icon-link').trigger('click'); // simulates click on the menu icon
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy(); //for the menu to be visible, the body element should NOT have menu-hidden class
        });  
		it('is hidden when clicked on menu icon with the menu is visible', function() {
			$('.menu-icon-link').trigger('click'); // simulates click on the menu icon
            expect($('body').hasClass('menu-hidden')).toBeTruthy(); //for the menu to hide, the body element should have menu-hidden class
        }); 
		
	});

    
	describe('Initial Entries', function() {
		window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        /* Test to ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
         */
		beforeEach(function(done) {
			//loadFeed function makes ajax call, so the test has to wait till the ajax call is returned. 
			//uses the 'done' function provided by Jasmine framework to ensure test is executed after the ajax call is returned.
			loadFeed(0,done); 
		});

		it('are loaded', function(done) {
            expect($('.feed .entry-link').length).toBeTruthy(); //if there is at least one entry, there will be article element with class entry as a child to the div element with class feed.
			done();
        }); 
		 
	});

	describe('New Feed Selection', function() {
        /* Test to ensure when a new feed is loaded by the loadFeed function that the content actually changes.
         */
		 var initialFeedEntry;
		beforeEach(function(done) {
			//to load the initial feed
			//loadFeed function makes ajax call, so the test has to wait till the ajax call is returned. 
			//uses the 'done' function provided by Jasmine framework to ensure test is executed after the ajax call is returned.
			loadFeed(0, function() {
				initialFeedEntry = $('.feed').find('h2').text(); //stores the initial feed entries as text
				$('.feed').empty(); //empties the feed entries
				loadFeed(1,done); //tries to load another set of feed entries. 
			});
		});


		it('changes the content of the feed container', function(done) {
            expect($('.feed').find('h2').text()).not.toEqual(initialFeedEntry); //ensures the current feed text is different from the initial one
			done();
        }); 
	});
}());
