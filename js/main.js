const loadBooks = () => {
	const searchField = document.getElementById('search-input');
	const searchText = searchField.value;
	// searchField.value = '';

	fetch('http://openlibrary.org/search.json?q=javascript')
		// fetch(`http://openlibrary.org/search.json?q=${searchText}`)
		.then((response) => response.json())
		.then((data) => displayAll(data.docs));
	// .then((data) => console.log(data.docs[0]));
};
const displayAll = (bookDetails) => {
	// console.log(books);

	const displayResult = document.getElementById('display-result');
	bookDetails.forEach((book) => {
		const bookDetailDiv = document.createElement('div');
		bookDetailDiv.classList.add('col');
		bookDetailDiv.innerHTML = `
		     <div class="card h-100">
		
		            <div class="card-body">
		                <h1 class="card-title">${book.title}</h1>
                        <br>
                        <p>Related Tags: <br>
                        ${book.subject ? book.subject : 'No Content Found'}</p>
		            </div>
		    `;
		displayResult.appendChild(bookDetailDiv);
	});
};
