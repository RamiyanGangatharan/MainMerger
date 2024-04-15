/**
 * @author: Ramiyan Gangatharan
 * Student ID: 100835223
 * @date: January 27, 2024
 */

/**
 * Main application script containing multiple functionalities like initializing carousels,
 * loading dynamic content, handling modals, validating forms, and more.
 * @author: Various contributors including Ramiyan Gangatharan and Joy Tejada.
 * Dates of contribution are marked at relevant sections.
 */


"use strict";

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace.
(function (): void {
    // Function to initialize the application
    function Start(): void {
        console.log("App Started!"); // Logs to console when the app starts
        loadHeader(); // Loads the header content dynamically
        loadFooter(); // Loads the footer content dynamically
        initializeCarousel(); // Initializes the image carousel
        fetchFactOfTheDay(); // Fetches a fact of the day from an external API

        // Switch case to execute page-specific code based on the document's title
        switch (document.title) {
            case "Team":
                displayModal(); // Displays modal for team page
                break;
            case "Register":
                displayRegisterPage(); // Handles register page display logic
                break;
            case "Login":
                displayLoginPage(); // Handles login page display logic
                break;
        }
    }


// Event listener for the window's load event to ensure Start function is called when the DOM is fully loaded
    window.addEventListener("load", Start);

    // Initializes the carousel functionality on the page
    function initializeCarousel(): void {
        let index: number = 0; // Current slide index
        // Selects all carousel images and descriptions using querySelectorAll
        const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-images img") as NodeListOf<HTMLElement>;
        const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-descriptions .description") as NodeListOf<HTMLElement>;

        // Exit function early if no slides or descriptions found
        if (slides.length === 0 || descriptions.length === 0) {
            return;
        }

        // Displays the slide and its corresponding description based on the current index
        function showSlide(n: number): void {
            // Looping logic for carousel
            if (n >= slides.length) index = 0;
            if (n < 0) index = slides.length - 1;

            // Hides all slides and descriptions
            for (let i: number = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                descriptions[i].style.display = "none";
            }

            // Shows the current slide and its description
            slides[index].style.display = "block";
            descriptions[index].style.display = "block";
        }

        // Advances the carousel to the next or previous slide
        function moveSlide(n: number): void {
            showSlide(index += n);
        }

        showSlide(index); // Initialize the first slide

        // Change slides every 5 seconds
        setInterval((): void => {
            moveSlide(1);
        }, 5000);
    }
// PORTFOLIO
    /**
     * Event listener for DOMContentLoaded event to ensure that the DOM is fully loaded before initializing project-related functionalities.
     */
    document.addEventListener('DOMContentLoaded', function():void {
        const projectsContainer: HTMLElement = document.getElementById('projects-container')!;
        const loadMoreButton: HTMLElement | null = document.getElementById('loadMore')!;


        let projects: { imageUrl: string; description: string; title: string }[];

        projects = [{
            title: 'Project One',
            description: 'A brief description of Project One.',
            imageUrl: "../../Images/NY-SKYLINE.webp"
        },
            {
                title: 'Project Two',
                description: 'A brief description of Project Two.',
                imageUrl: "../../Images/YYZ-SKYLINE.webp"
            },
            {
                title: 'Project Three',
                description: 'A brief description of Project Three.',
                imageUrl: "../../Images/england_skyline.jpg"
            },
            {
                title: 'Project Four',
                description: 'A brief description of Project Four.',
                imageUrl: "../../Images/PWC_OFFICE.webp"
            },
            {
                title: 'Project Five',
                description: 'A brief description of Project Five.',
                imageUrl: "../../Images/cup-team-photo-2023-2.png"
            },
            {
                title: 'Project Six',
                description: 'A brief description of Project Six.',
                imageUrl: "../../Images/CVPRW2023_EventVision_group_picture.jpg"
            }
        ];

        /**
         * Creates an HTML card element containing project details.
         * @param {Object} project - The project data.
         * @param {string} project.title - The title of the project.
         * @param {string} project.description - A brief description of the project.
         * @param {string} project.imageUrl - The URL of the project's image.
         * @returns {HTMLElement} The project card element.
         */
        function createProjectCard(project: { title: string; description: string; imageUrl: string; }): HTMLElement {
            let card: HTMLDivElement = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" 
                    src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
            return card;
        }

        /**
         * Loads a specified number of projects from the projects array and appends them to the projects' container.
         * If there are no more projects to load, disables the 'Load More' button.
         * @param {number} [numProjects=3] - The number of projects to load each time the function is called.
         */
        function loadProjects(numProjects: number = 3): void {
            let projectsToLoad: { imageUrl: string; description: string; title: string }[] = projects.splice(0, numProjects);
            projectsToLoad.forEach((project: { imageUrl: string; description: string; title: string }):void => {
                projectsContainer.appendChild(createProjectCard(project));
            });
            if (projects.length === 0) {
                if (loadMoreButton instanceof HTMLButtonElement) {
                    loadMoreButton.disabled = true;
                }
            }
        }


        // Initial load of projects
        loadProjects();

        // Event listener for 'Load More' button
        loadMoreButton.addEventListener('click', function() {
            loadProjects();
        });
    });

    window.addEventListener("load", Start);


    /**
     * @author: Joy Tejada
     * Student ID: 100883359
     * @date: 2024-01-27
     */

// Teams Page: Modal
// Get the modal
    function displayModal():void {
        const openRamiyan: HTMLElement | null = document.getElementById("open-ramiyan");
        const openJoy: HTMLElement | null = document.getElementById("open-joy");
        const modalRamiyan: HTMLElement | null = document.getElementById('ramiyan-modal');
        const modalJoy: HTMLElement | null = document.getElementById("joy-modal");
        const closeRamiyan: HTMLElement | null = document.getElementById("closeRamiyan");
        const closeJoy: HTMLElement | null = document.getElementById("closeJoy");

        if (openRamiyan instanceof HTMLElement) {
            openRamiyan.addEventListener("click", ():void => {
                modalRamiyan?.classList.add("show");
            });
        }

        if (openJoy instanceof HTMLElement) {
            openJoy.addEventListener("click", ():void => {
                modalJoy?.classList.add("show");
            });
        }

        if (closeRamiyan instanceof HTMLElement) {
            closeRamiyan.addEventListener("click", ():void => {
                modalRamiyan?.classList.remove("show");
            });
        }

        if (closeJoy instanceof HTMLElement) {
            closeJoy.addEventListener("click", ():void => {
                modalJoy?.classList.remove("show");
            });
        }
    }


    /**
     * Created by Ramiyan Gangatharan
     * @param method
     * @param url
     * @param callback
     * @constructor
     */
    function AJAX_REQUEST(method: string, url: string | URL, callback: { (responseText: any): void; (arg0: string): void; }):void
    {
        // Step 1:instantiate new XHR object
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        // Step 2: open XHR request
        xhr.open(method, url);

        // Step 4: Add event listener for the readystatechange event
        // This event is triggered when the state of a document being fetched changes
        xhr.addEventListener("readystatechange", ():void =>
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                if(typeof callback == "function")
                {
                    callback(xhr.responseText);
                }
                else
                {
                    console.error("ERROR: CALLBACK NOT A FUNCTION");
                }
            }
        });

        // Step 3: send XHR request
        xhr.send();
    }
    // Function to load the header dynamically
    function loadHeader(): void {
        fetch('/views/components/header.html') // Use root-relative path
            .then(response => response.text())
            .then(html=> {
                let headerElement: HTMLElement | null;
                headerElement = document.getElementById('site-header');
                if (headerElement !== null) {
                    headerElement.innerHTML = html;
                } else {
                    console.warn('The header element was not found in the document.');
                }
            })
            .catch(error => {
                console.warn('Error loading the header:', error);
            });
    }

    // Function to load the footer dynamically
    function loadFooter():void {
        fetch('/views/components/footer.html') // Use root-relative path
            .then(response => response.text())
            .then(html => {
                let footerElement: HTMLElement | null;
                footerElement = document.getElementById('site-footer');
                if (footerElement !== null) {
                    footerElement.innerHTML = html;
                } else {
                    console.warn('The footer element was not found in the document.');
                }
            })
            .catch(error => {
                console.warn('Error loading the footer:', error);
            });
    }


    document.addEventListener('DOMContentLoaded', function():void {
        loadHeader();
        loadFooter();
    });

// EVENTS

    document.addEventListener('DOMContentLoaded', function():void {
        // Define the callback function to process the response
        /**
         * This function grabs content from the JSON file
         * @param responseText
         */
        function processEventsData(responseText: string):void {
            const data = JSON.parse(responseText);
            const events = data.event;
            const eventsContainer: HTMLElement | null = document.getElementById('events-container');

            // Clear out any existing content in the events container
            if (eventsContainer) {
                eventsContainer.innerHTML = '';

                events.forEach((event: { imageUrl: string; title: string; description: string; }): void => {
                    let eventElement = document.createElement('div');
                    eventElement.className = 'col-md-4 mb-4';
                    eventElement.innerHTML = `
            <div class="card">
                <img src="${event.imageUrl}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
            </div>`;
                    eventsContainer.appendChild(eventElement);
                });
            } else {
                console.warn('The events container element was not found in the document.');
            }
        }

        // Use the AJAX_REQUEST function to fetch the events.json file
        AJAX_REQUEST('GET', '../../data/events.json', processEventsData);
    });

    interface FactApiResponse {
        fact: string;
    }

    function fetchFactOfTheDay(): void {
        const limit:1 = 1;
        const apiKey: string = 'NhKexKzfF0TmdyXL/Jj/0Q==MMvyNrvqLLVQWkS2'; // Reminder: It's best practice to keep API keys hidden, not in front-end code

        $.ajax({
            method: 'GET',
            url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result: any[]): void { // Temporarily accept any[] until we verify the structure
                console.log(result);

                // Use a type assertion to tell TypeScript what structure we're expecting
                const facts: FactApiResponse[] = result as FactApiResponse[];

                if (facts.length > 0) {
                    $('#fact-of-the-day').text(facts[0].fact);
                } else {
                    console.error('Unexpected result structure:', result);
                }
            },
            error: function(jqXHR: { responseText: any; }): void {
                console.error('Error fetching fact of the day:', jqXHR.responseText || 'Unknown error');
            }
        });
    }
    /**
     * Checks if a user is logged in
     * @constructor
     */
    function CheckLogin(): void {
        if(localStorage.length > 0){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout</a>`);

            let keys = Object.keys(localStorage);

            // Writes the users name if they are logged in on the homepage
            for(const key of keys){
                if(key === "users"){
                    let userData = localStorage.getItem(key);
                    // Check if userData is not null before proceeding
                    if (userData !== null) {
                        let usersName = userData.split(",");
                        $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`);
                    }
                }
            }
        }

        $("#logout").on("click", function ():void{
            // Perform Logout
            localStorage.clear();

            // Redirect to login.html page
            location.href = "login.html";
        });
    }


    /**
     * Regular expressions to help validate the register form
     */
    function RegisterFormValidation():void{
        // Call for First Name
        ValidateField("#firstName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid First Name.");

        // Call for Last Name
        ValidateField("#lastName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid Last Name.");

        // Call for Address
        // Taken from https://regex101.com/library/CtqxiP?filterFlavors=javascript&orderBy=MOST_RECENT&search=
        ValidateField("#address",
            /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":?!/]+$/,
            "Please enter a valid Address.")

        // Call for Phone Number
        ValidateField("#phoneNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid Contact Number.");

        // Call for Email Address
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address!");


    }

    /**
     * Validate Form Fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    const ValidateField = (input_field_id: string, regular_expression: RegExp, error_message: string): void => {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function(event) {
            // Use $(event.target) instead of $(this) for better type inference
            let inputField = $(event.target);
            let inputFieldText = inputField.val();
            if (!regular_expression.test(<string>inputFieldText)) {
                inputField.trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // Full name was successful
                messageArea.removeAttr("class").hide();
            }
        });
    };

    /**
     * The Register Page
     * When the form is submitted after validation, will check if username already exists,
     * and if the passwords are the same.
     */
    function displayRegisterPage():void{
        console.log("Called RegisterPage");

        RegisterFormValidation();

        $("#sendButton").on("click", function (): void {
            // Typecast each element to HTMLInputElement to access the value property
            let firstName = document.getElementById("firstName") as HTMLInputElement;
            let lastName = document.getElementById("lastName") as HTMLInputElement;
            let address = document.getElementById("address") as HTMLInputElement;
            let phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
            let emailAddress = document.getElementById("emailAddress") as HTMLInputElement;
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;
            let confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;

            let success:boolean = true;
            // Assuming newUser and core.User exist and are correctly implemented
            let newUser = new core.User();
            let messageArea = $("#messageArea").hide();

            $.get("../../data/user.json", function(data: { users: any; }): void {
                for(const user of data.users){
                    if(username.value === user.Username){
                        success = false;
                        break;
                    }
                }
                if(success && password.value === confirmPassword.value){
                    // Assuming toJSON is correctly implemented and can handle HTMLInputElement types
                    newUser.toJSON(firstName.value, lastName.value, address.value, phoneNumber.value, emailAddress.value, username.value, password.value);

                    // Assuming serialize is correctly implemented
                    sessionStorage.setItem("users", <string>newUser.serialize());
                    messageArea.removeClass("alert alert-danger").hide();

                    location.href = "../../index.html";
                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Username Taken or Passwords do not match.").show();
                }
            });
        });
    }

    /**
     * Displays the login page
     * Authentication if the users Login Credentials are accurate to the data stored
     * Shows error messages if there is an error
     */
    function displayLoginPage(){
        console.log("Called Displayed Login Page.");

        let messageArea = $("#messageArea").hide();

        $("#submitButton").on("click", function() {
            // Correctly cast elements to HTMLInputElement
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;

            // It's safe to assume newUser and core.User are properly defined elsewhere
            let success = false;
            let newUser = new core.User();

            $.get("../../data/user.json", function(data: { users: any; }) {
                // Check if the fetched users array is not empty and elements are not null
                if (username && password) {
                    for(const user of data.users) {
                        // Now safely use the value property
                        if(username.value === user.Username && password.value === user.Password) {
                            newUser.fromJSON(user); // Assuming fromJSON is a method of newUser
                            success = true;
                            break;
                        }
                    }
                    if(success) {
                        // Assuming serialize is a method of newUser
                        localStorage.setItem("users", <string>newUser.serialize());
                        messageArea.removeAttr("class").hide();
                        location.href = "../../index.html";
                    } else {
                        $("#username").trigger("focus").trigger("select");
                        messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                    }
                }
            });
        });

        $("#cancelButton").on("click", function(): void {
            location.href = "../../index.html";
        });
    }

// Gallery Model
    function openModal(): void {
        const modal = document.getElementById("myModal");
        if (modal) { // Check if the modal is not null
            modal.style.display = "block";
        } else {
            console.warn("Modal element not found");
        }
    }

    function closeModal(): void {
        const modal = document.getElementById("myModal");
        if (modal) { // Check if the modal is not null
            modal.style.display = "none";
        } else {
            console.warn("Modal element not found");
        }
    }
    let slideIndex:number = 1;
    showSlides(slideIndex);

// Next/previous controls
    function plusSlides(n: number):void {
        showSlides(slideIndex += n);
    }

// Thumbnail image controls
    function currentSlide(n: number):void {
        showSlides(slideIndex = n);
    }

    function showSlides(n: number): void {
        let slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>; // Cast to specific element type
        let dots: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>; // Assuming dots can be treated as HTMLElements
        let captionText: HTMLElement | null = document.getElementById("caption");

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Now TypeScript knows `style` exists
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Ensure slideIndex is within bounds to avoid accessing undefined elements
        if (slideIndex - 1 < slides.length && slideIndex - 1 < dots.length) {
            slides[slideIndex - 1].style.display = "block"; // Safe to access `style`
            dots[slideIndex - 1].className += " active";
            // Check if captionText is not null and dots are HTMLElements (for 'alt')
            if (captionText !== null && dots[slideIndex - 1] instanceof HTMLElement) {
                captionText.innerHTML = dots[slideIndex - 1].getAttribute('alt') || ""; // Use getAttribute for 'alt'
            }
        }
    }


// getting feedback asynchronously with Ajax
    function AjaxFeedback(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        // Assuming 'feedback' is a form input or textarea, cast it accordingly.
        let feedback: HTMLInputElement | HTMLTextAreaElement | null = document.getElementById("feedback") as HTMLInputElement | HTMLTextAreaElement | null;

        xhr.open("GET", "../../views/content/contact.html", true);

        xhr.addEventListener("readystatechange", ():void => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Check if 'feedback' is not null and has a 'value' property before using it.
                if (feedback !== null) {
                    sessionStorage.setItem("feedback", feedback.value);
                }
                location.href = "../../index.html";
            }
        });
        xhr.send();
    }
})();
