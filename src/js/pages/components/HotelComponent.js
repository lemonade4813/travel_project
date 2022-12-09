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
      <form id="form">
        <p>국가명</p><input type="text" name="nation">
        <p>호텔명</p><input type="text" name="hotelName">
        <p>주소</p><input type="text" name="address">
        <p>전화번호</p><input type="text" name="tel">
        <p>객실 타입<p><input type="text" name="roomType">
        <input type="file" name="file">
        <input type="submit">
      </form>
      <ul>
        ${items.map((item, key) => ` 
          <li>${item.nation}</li>
          <li>${item.hotelName}</li>
          <li>${item.address}</li>
          <li>${item.tel}</li>
          <li>${item.roomType}</li>
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
      `
  }

  setEvent () {
    this.target.querySelector('.addBtn').addEventListener('click', () => {
      const { items } = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });

    // 삭제 버튼 이벤트 등록
    
    this.target.querySelectorAll('.deleteBtn').forEach(deleteBtn =>
      deleteBtn.addEventListener('click', ({ target }) => {
        const items = [ ...this.state.items ];
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }))

    // 호텔 정보 등록 하기

      this.target.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const payload = new FormData(form);
    
        fetch('http://localhost:4000/hotel', {
          method: 'POST',
          body: payload,
        })
        .then(res => res.json())
        .then(data => console.log(data));
      }
      this.setup()
      );

    
    }

    setState (newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

  }