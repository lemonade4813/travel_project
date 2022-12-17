export default class HotelComponent  {
  
  constructor (target) {
    this.target = target;
    this.state = {items: []};
    this.setup();
  }

  render () {
    this.target.innerHTML = this.template();
    this.setEvent();
  }

  async setup () {
    await fetch('http://localhost:4000/hotel', {method: 'GET'})
    .then((response) => response.json())
    .then((data) =>{
        this.state.items = data
        //console.log(data)
        //console.log(this.state.items)
    })
    this.render();
  }
  
  template () {
    const {items} = this.state;
    console.log(items)
    return `
      <form id="hotelInfoInput">
        <ul>
          <li>국가명 <input type="text" name="nation"></li>
          <li>호텔명 <input type="text" name="hotelName"></li>
          <li>주소 <input type="text" name="address"></li>
          <li>전화번호 <input type="text" name="tel"></li>
          <li>객실 타입 <input type="text" name="roomType"></li>
          <li>이미지 등록 <input type="file" name="file"><li>
          <li><input type="submit"></li>
        </ul>
      </form>
      <table id ="hotelList">
        <thead>
          <tr>
            <th>등록 아이디</th>
            <th>국가명</th>
            <th>호텔명</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>객실 타입</th>
            <th>이미지</th>
            <th>삭제 버튼</th>
          <tr>
          </thead>
          <tbody>   
          ${items.map((item, key) => ` 
            <tr>
            <td>${item._id}</td>
            <td>${item.nation}</td>
            <td>${item.hotelName}</td>
            <td>${item.address}</td>
            <td>${item.tel}</td>
            <td>${item.roomType}</td>
            <td><img src="/server/uploads/${item.originalFileName}"></td>
            <td>
              <button class="deleteBtn" data-index="${item._id}">삭제</button>
            </td>
            </tr>
        `).join('')} 
        </tbody>
      <table>
      `
  }

  setEvent () {
  
    // 삭제 버튼 이벤트 등록
    
    this.target.querySelectorAll('.deleteBtn').forEach(deleteBtn =>
      deleteBtn.addEventListener('click', async ({ target }) => {
 
        await fetch(`http://localhost:4000/hotel/${target.dataset.index}`, {method:'DELETE'})
        .then(res => res.json())
        .then(data => console.log(data))
        
        this.setup()
      }))

    // 호텔 정보 등록 하기

      this.target.querySelector('#hotelInfoInput').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const hotelInfo = new FormData(hotelInfoInput);
    
        await fetch('http://localhost:4000/hotel', {
          method: 'POST',
          body: hotelInfo,
        })
        .then(res => res.json())
        .then(data => console.log(data));
    
      this.setup()
      });
    }

    setState (newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

  }