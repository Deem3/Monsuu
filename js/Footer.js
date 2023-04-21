'use strict';

const footer = document.getElementById('Footer');
const content = document.createRange().createContextualFragment(`
  <ul>
    <li><a href="">Бидний тухай</a></li>
    <li><a href="">Ажлын байр</a></li>
    <li class="brand__name"><a href="">Monsuu</a></li>
    <li><a href="">Хаяг байршил</a></li>
    <li><a href="">Тусламж</a></li>
  </ul>
  <address>
    <h2>
      Монсүү ХХК, Хүнсчдийн гудамж, 4-р хороо, Сонгинохайрхан дүүрэг,
      Улаанбаатар хот
    </h2>
    <div class="social__address">
      <img src="images/footer/facebook.svg" alt="monsuu facebook" />
      <img src="images/footer/instagram.svg" alt="monsuu instagram" />
      <img src="images/footer/mail.svg" alt="monsuu email" />
    </div>
  </address>
  <h2 class="footer__copyright">
    &copy; Monsuu, Inc. 2023. We love our customers!
  </h2>
`);
footer.append(content);
