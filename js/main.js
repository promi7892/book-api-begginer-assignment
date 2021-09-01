// Load data on click
const loadBooks = () => {
	const searchField = document.getElementById('search-input');
	const searchText = searchField.value;
	searchField.value = '';
	if (searchText === '') {
		alert('Please type the book name you are looking for');
		displaySpinner('none');
	} else {
		fetch(`http://openlibrary.org/search.json?q=${searchText}`)
			.then((response) => response.json())
			.then((data) => displayAll(data.docs));
		displaySpinner('block');
	}
};

// display all information in a card
const displayAll = (bookDetails) => {
	const displayResult = document.getElementById('display-result');
	let count = document.getElementById('count');
	count.innerHTML = `Total books found ${bookDetails.length}`;

	displayResult.textContent = '';
	bookDetails.forEach((book) => {
		const bookDetailDiv = document.createElement('div');
		bookDetailDiv.classList.add('col');
		bookDetailDiv.innerHTML = `
		     <div class="card h-100 ">
		<img class="card-img-top img-fluid h-50 w-75 mx-auto my-2 shadow-lg"
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
		            <div class="card-body">
		                <h3 class="card-title">${book.title}</h3>
                        <br>
                       <p><b>Author Name: </b>
                       ${book.author_name} </p>
                        
                        <p><b>Publication On: </b>
                        ${
													book.first_publish_year
														? book.first_publish_year
														: 'Information Unavailable'
												} 
                                                </p>
                        <p><b>Publisher Name: </b>
                        ${
													book.publisher ? book.publisher : 'No information'
												}</p>
                        <p><b>Related Tags:</b> <br>
                        ${
													book.subject
														? book.subject.slice(1, 5)
														: 'Nothing is related'
												}</p>
		            </div>
		    `;
		displayResult.appendChild(bookDetailDiv);
	});
	displaySpinner('none');
};

// spinner function
const displaySpinner = (viewOnPage) => {
	const spinner = document.getElementById('spinner');
	spinner.style.display = viewOnPage;
};
