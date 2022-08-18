import React from 'react'

const Home = () => {
    return (
       <> <header
            className="py-5" style={{ backgroundImage: "url(https://pbs.twimg.com/media/FOZKlglUcAIoB2u?format=jpg&name=large)",}}>
            <div className="container px-5">
              <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center my-5">
                    <h1 className="display-5 fw-bolder text-info mb-2">
                      The Latest and Greatest Gaming Gear
                    </h1>
                    <p className="lead text-white mb-4">
                      Enhance your gaming experience today! 
                    </p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                      <a className="btn btn-primary btn-lg px-4 me-sm-3"
                        href="/store">Browse</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <section className="bg-light pt-5 pb-5" style={{backgroundImage: "url(https://wallpaper.dog/large/5538330.jpg)"}} id="services">
            <div className="container px-4">
                <div className="row gx-4 justify-content-center">
                    <div className="col-lg-8 text-success mb-2">
                        <h2 className="fw-bolder">Change the font ANNOUNCING CALL OF DUTY®:</h2>
                        <h4>THE FRANCHISE SHOWCASE EVENT, AND OPEN BETA DATE TIMES FOR CALL OF DUTY®: MODERN WARFARE® II. Mark your calendars for September 15: The future of Call of Duty® will be revealed at Call of Duty: Next, a Franchise Showcase Event. Then clear your schedule for September 16–-26: Detailed Beta dates and timing is locked and loaded. </h4>
                    </div>
                </div>
            </div>
        </section>
          <section className="py-5 border-bottom" id="features">
            <div className="container px-5 my-5">
              <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <h2 className="h4 fw-bolder">Store</h2>
                  <p>
                    Start browsing our countless collection of gaming awesomeness!
                  </p>
                  <a className="text-decoration-none" href="/store">
                    Check Store
                  </a>
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <h2 className="h4 fw-bolder">Login</h2>
                  <p>
                    Have an account? Login as a user for the ultimate customer experience!
                  </p>
                  <a className="text-decoration-none" href="/login">
                    Login to account
                  </a>
                </div>
                <div className="col-lg-4">
                  <h2 className="h4 fw-bolder">Register</h2>
                  <p>Don't have an account with us yet? Create one here for the ultimate user experience!</p>
                  <a className="text-decoration-none" href="/register">
                    Register new account
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 border-bottom">
            <div className="container px-5 my-5 px-5">
              <div className="text-center mb-5">
                <h2 className="fw-bolder">Gamer Reviews</h2>
                <p className="lead mb-0">Our gamers from all over the world love using our website!</p>
              </div>
              <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                  <div className="card mb-4">
                    <div className="card-body p-4">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                        </div>
                        <div className="ms-4">
                          <p className="mb-1">
                            Thank you for such an amazing selection of tools that helps my gaming experience!
                          </p>
                          <div className="small text-muted">
                            - Simu, South Korea
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body p-4">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                        </div>
                        <div className="ms-4">
                          <p className="mb-1">
                          With the SteelSeries multi-platform gaming headset, I can finally hear whether an enemy is above or below me in Warzone!
                          </p>
                          <div className="small text-muted">
                            - Ruby, USA
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}

export default Home