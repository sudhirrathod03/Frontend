function Awards() {
  return (
    <div className="container mb-5 p-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src="/assets/images/largestBroker.svg" alt="largest broker" />
        </div>
        <div className="col-6 p-3 mt-3">
          <h1 className="mb-4">Largest stock broker in india</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in india daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-12 col-md-6">
              <ul>
                <p>
                  <li>future and options</li>
                </p>
                <p>
                  {" "}
                  <li>commodity derivatives</li>
                </p>
                <li>currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <p>
                <li>Stock and IPOs</li>
              </p>
              <p>
                <li>Direct mutual funds</li>
              </p>
              <li>Bonds and gov. securities</li>
            </div>
          </div>
          <img src="/assets/images/pressLogos.png" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;
