document.addEventListener('DOMContentLoaded', function () {
  const reviewText = document.getElementById('review-text');
  const rating = document.querySelectorAll('input[name="rating"]');
  const productIdInput = document.getElementById('product-id');
  const submitBtn = document.getElementById('submit-btn');
  const sortByDropdown = document.getElementById('sort-by');

  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (reviewText.value.length < 10) {
      alert('Please enter a review with at least 10 characters.');
    } else {
      let selectedRatingValue = 0;

      rating.forEach((radio) => {
        if (radio.checked) {
          selectedRatingValue = radio.value;
        }
      });

      if (selectedRatingValue === 0) {
        alert('Please select a rating.');
        return;
      }

      const formData = {
        title: document.getElementById('name').value,
        content: reviewText.value,
        rating: parseInt(selectedRatingValue),
        productId: productIdInput.value,
      };

      console.log(formData);

      axios.post('https://review-backend-7s2n.onrender.com/api/reviews', formData)
        .then((response) => {
          console.log(response.data);
          reviewText.value = '';
          rating.forEach((radio) => {
            radio.checked = false;
          });
          productIdInput.value = '';
          document.getElementById('name').value = '';
          const page = parseInt(getQueryParameter('page')) || 1;
          const pageSize = 4;
          const sortBy = getQueryParameter('sortBy') || 'date';
          fetchSortedReviews(page, pageSize, sortBy);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  function fetchSortedReviews(page, pageSize, sortBy) {
    fetch(`https://review-backend-7s2n.onrender.com/api/reviews?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`)
      .then((response) => response.json())
      .then((data) => {
        const reviewList = document.getElementById('review-list');

        reviewList.innerHTML = '';

        data.reviews.forEach((review) => {
          const { title, content, rating, productId } = review;
          const reviewElement = document.createElement('li');
          reviewElement.textContent = `Product ID: ${productId}, Title: ${title}, Content: ${content}, Rating: ${rating}`;
          reviewList.appendChild(reviewElement);
        });

        renderPagination(page, data.totalPages);
      })
      .catch((error) => {
        console.error('Failed to fetch reviews', error);
      });
  }

  function handleSortChange() {
    const sortBy = document.getElementById('sort-by').value;
    const keyword = document.getElementById('keyword-filter').value;
    const page = 1;
    const pageSize = 4;

    const url = new URL(window.location.href);
    url.searchParams.set('sortBy', sortBy);
    url.searchParams.set('page', page);
    url.searchParams.set('keyword', keyword);
    window.history.pushState({ sortBy }, '', url.toString());

    fetchSortedReviews(page, pageSize, sortBy, keyword);
  }

  document.getElementById('sort-by').addEventListener('change', handleSortChange);

  function fetchPaginatedReviews(page, pageSize) {
    const sortBy = getQueryParameter('sortBy') || 'date';
    fetchSortedReviews(page, pageSize, sortBy);
  }

  function renderPagination(page, totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = `?page=${i}`;
      const sortBy = getQueryParameter('sortBy') || 'date';
      pageLink.href = `?page=${i}&sortBy=${sortBy}`;
      pageLink.textContent = i;

      if (i === page) {
        pageLink.classList.add('active');
      }

      paginationElement.appendChild(pageLink);
    }

    const pageLinks = document.querySelectorAll('#pagination a');

    pageLinks.forEach((pageLink) => {
      pageLink.addEventListener('click', (event) => {
        event.preventDefault();
        const newPage = parseInt(event.target.textContent);
        fetchPaginatedReviews(newPage, 4);
      });
    });
  }

  function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const page = parseInt(getQueryParameter('page')) || 1;
  const pageSize = 4;

  fetchPaginatedReviews(page, pageSize);
});
