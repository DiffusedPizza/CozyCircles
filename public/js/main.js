/*
	Reflex by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$menu.addClass('visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$menu.removeClass('visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$menu.toggleClass('visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$menu.removeClass('visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

// ACCOUNT CREATION FUNCTIONALITY
// function toggleSection(sectionId) {
//     console.log('Toggle Section called with:', sectionId);

//     let targetSection = document.getElementById(sectionId);

//     if (targetSection.style.display === 'block') {
//         // If the section is already visible, hide it
//         targetSection.style.display = 'none';
//     } else {
//         // If the section is not visible, display it
//         let allSections = document.querySelectorAll('.hidden');
//         allSections.forEach(function(section) {
//             section.style.display = 'none';
//         });

//         targetSection.style.display = 'block';

//     }
// }

function toggleSection(sectionId) {
    console.log('Toggle Section called with:', sectionId);

    let targetSection = document.getElementById(sectionId);

    // Toggle the visibility of the section
    if (targetSection.style.display === 'block') {
        targetSection.style.display = 'none';

        // Remove the 'primary' class from the corresponding <a> element
        let clickedLink = document.getElementById(sectionId + 'Button');
        if (clickedLink) {
            clickedLink.classList.remove('primary');
            console.log('Removed primary class');
        } else {
            console.error('Could not find the button element with ID:', sectionId + 'Button');
        }
    } else {
        // Hide all sections
        let allSections = document.querySelectorAll('.hidden');
        allSections.forEach(function (section) {
            section.style.display = 'none';
        });

        // Remove the 'primary' class from all links
        let allLinks = document.querySelectorAll('.button.fit');
        allLinks.forEach(function (link) {
            link.classList.remove('primary');
        });

        // Display the clicked section
        targetSection.style.display = 'block';

        // Add the 'primary' class to the corresponding <a> element
        let clickedLink = document.getElementById(sectionId + 'Button');
        if (clickedLink) {
            clickedLink.classList.add('primary');
            console.log('Added primary class');
        } else {
            console.error('Could not find the button element with ID:', sectionId + 'Button');
        }
    }
}


// Password Toggle
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#pass');
const confirmPass = document.querySelector('#confirmPass');

togglePassword.addEventListener('click', function () {
    // toggle the type attribute for the password field
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});

// Add a similar event listener for the confirm password field
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');

if (toggleConfirmPassword) {
	toggleConfirmPassword.addEventListener('click', function () {
    // toggle the type attribute for the confirm password field
    const type = confirmPass.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPass.setAttribute('type', type);

    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});
}


// ACCOUNT FORM TESTING 
document.addEventListener('DOMContentLoaded', function () {
    // Form Submission
    const registrationForm = document.querySelector('#registrationForm');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const accountType = document.querySelector('#demo-category').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#pass').value;
        const confirmPassword = document.querySelector('#confirmPass').value;
        const checkbox = document.querySelector('#demo-copy');

        // Validate form data if needed
        // Check if an account type is selected
        if (accountType === '') {
            alert('Please select an account type.');
            return;
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please check and try again.');
            return;
        }

        // Check if the checkbox is checked
        if (!checkbox.checked) {
            alert('Please confirm that you have read and agreed to the terms.');
            return;
        }

        // Create the user account with the selected account type
        const userAccount = {
            accountType: accountType,
            name: name,
            email: email,
            password: password
        };

        // Log the user account information to the console
        console.log('User account:', userAccount);

        // You can add additional logic here for form submission, validation, etc.
    });
});

