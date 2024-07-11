import React from 'react';

const CardComponent = () => {
  return (
    
      <div className="row gy-4 " style={{maxWidth:'40%', marginLeft:'13%'}} >
        <div className="col-12">
        <div id="carousel-1" class="carousel slide" data-bs-ride="false">
    <div class="carousel-inner">
        <div class="carousel-item active"><img class="w-100 d-block" src="https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F13244501%2F7719bf5d5433e35c910c73c9613d680c%2FScreenshot%202024-06-05%20at%2011.45.41AM.png?generation=1717568203645379&alt=media" alt="Slide Image" /></div>
        <div class="carousel-item"><img class="w-100 d-block" src="https://ceotelangana.nic.in/images/sliders/slide1.jpg" alt="Slide Image" /></div>
        <div class="carousel-item"><img class="w-100 d-block" src="https://ceotelangana.nic.in/images/sliders/slide3.jpg" alt="Slide Image" /></div>
    </div>
    <div><a class="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></a><a class="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></a></div>
    <div class="carousel-indicators"><button class="active" type="button" data-bs-target="#carousel-1" data-bs-slide-to="0"></button><button type="button" data-bs-target="#carousel-1" data-bs-slide-to="1"></button><button type="button" data-bs-target="#carousel-1" data-bs-slide-to="2"></button></div>
</div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <img className="card-img w-100 d-block" src="https://www.aljazeera.com/wp-content/uploads/2024/06/INTERACTIVE-INDIA-BJP-and-alliances-claim-victory-_BJP_JUNE5_2024_edit-1717605880.png?w=770&resize=770%2C770&quality=80" alt="Placeholder" />
            {/* <div className="card-img-overlay text-center d-flex flex-column justify-content-center  p-4">
              <h4>Title</h4>
              <p>Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <img className="card-img w-100 d-block" src="https://www.aljazeera.com/wp-content/uploads/2024/06/INTERACTIVE-Uttar-Pradesh-and-Maharashtra-results_june5_2024-copy@3x-1717606100.png?w=770&resize=770%2C770&quality=80" alt="Placeholder" />
            {/* <div className="card-img-overlay text-center d-flex flex-column justify-content-center  p-4">
              <h4>Title</h4>
              <p>Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
            </div> */}
          </div>
        </div>
      </div>

  );
};

export default CardComponent;
