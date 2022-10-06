Vue.component('search', {
  template:
    `
    <form action="#" class="search-block" @submit.prevent='$parent.filter'>
      <input type="text" class="search-inpt" v-model='$parent.userSearch'>
      <button class="search-btn" type="submit">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
        <path d="M23.762,22.681 L17.569,16.586 C19.190,14.825 20.187,12.494 20.187,9.929 C20.186,4.443 15.668,-0.002 10.093,-0.002 C4.519,-0.002 0.001,4.443 0.001,9.929 C0.001,15.416 4.519,19.862 10.093,19.862 C12.502,19.862 14.711,19.028 16.446,17.644 L22.663,23.763 C22.966,24.062 23.458,24.062 23.761,23.763 C24.065,23.464 24.065,22.979 23.762,22.681 ZM10.093,18.334 C5.377,18.334 1.553,14.572 1.553,9.929 C1.553,5.288 5.377,1.525 10.093,1.525 C14.810,1.525 18.633,5.288 18.633,9.929 C18.633,14.572 14.810,18.334 10.093,18.334 Z"></path>
        </svg>
        <i class="fas fa-search"></i>
      </button>
    </form>
    `

})