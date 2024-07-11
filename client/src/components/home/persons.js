import React from "react";

const Persons = () => {
    return(
        <div>
            <div class="container py-4 py-xl-5">
        <div class="row mb-4 mb-lg-5">
            {/* <div class="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Our Team</h2>
                <p class="w-lg-50">Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
            </div> */}
        </div>
        <div class="row gy-4 row-cols-2 row-cols-md-5">
            <div class="col">
                <div class="card border-0 shadow-none">
                <div class="card-body text-center d-flex flex-column align-items-center p-0"><img class="rounded-circle mb-3 fit-cover" width="130" height="130" alt="imagee" src="https://imgs.search.brave.com/hwrgnEy1mG4XftEtEsmZHo4126ViDqEKDlQ0v4kz3rU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxqYXplZXJhLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNi8yMDI0LTA2/LTA0VDE1NTc1MFpf/MzM0OTIyODM3X1JD/MkY0OEFEVDEyS19S/VFJNQURQXzNfSU5E/SUEtRUxFQ1RJT04t/TU9ESS0xNzE3NTkx/NzMxLmpwZz9yZXNp/emU9NzcwLDUxMyZx/dWFsaXR5PTgw" />
                        <h5 class="fw-bold text-primary card-title mb-0"><strong>Shri Narendra Modi</strong></h5>
                        <p class="text-muted card-text mb-2">Prime Minister</p>
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card border-0 shadow-none">
                    <div class="card-body text-center d-flex flex-column align-items-center p-0"><img class="rounded-circle mb-3 fit-cover" width="130" height="130" alt="imagee" src="https://imgs.search.brave.com/xRzlfods8oOT6e7fS9uuKovNnWOkI-5faBZN5WQx0n8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDExODEy/MTAwLmpwZw" />
                        <h5 class="fw-bold text-primary card-title mb-0"><strong>droupadi Murmu</strong></h5>
                        <p class="text-muted card-text mb-2">president</p>
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card border-0 shadow-none">
                    <div class="card-body text-center d-flex flex-column align-items-center p-0"><img class="rounded-circle mb-3 fit-cover" width="130" height="130" alt="imagee" src="https://ceoandhra.nic.in/ceoap_new/ceo/images/ec-rk.jpg" />
                        <h5 class="fw-bold text-primary card-title mb-0"><strong>Shri Rajiv Kumar</strong></h5>
                        <p class="text-muted card-text mb-2">Chief Election Commissioner</p>
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card border-0 shadow-none">
                    <div class="card-body text-center d-flex flex-column align-items-center p-0"><img class="rounded-circle mb-3 fit-cover" width="130" height="130" alt="imagee" src="https://ceoandhra.nic.in/ceoap_new/ceo/images/EC-Shri-Gyanesh-Kumar.jpg" />
                        <h5 class="fw-bold text-primary card-title mb-0"><strong>Shri Gyanesh Kumar</strong></h5>
                        <p class="text-muted card-text mb-2">Election Commissioner</p>
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card border-0 shadow-none">
                    <div class="card-body text-center d-flex flex-column align-items-center p-0"><img class="rounded-circle mb-3 fit-cover" width="130" height="130" alt="imagee" src="https://ceoandhra.nic.in/ceoap_new/ceo/images/EC-Dr-Sukhbir-Singh-Sandhu.jpg" />
                        <h5 class="fw-bold text-primary card-title mb-0"><strong>Dr Sukhbir Singh Sandhu</strong></h5>
                        <p class="text-muted card-text mb-2">Election Commissioner</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    );
}

export default Persons;