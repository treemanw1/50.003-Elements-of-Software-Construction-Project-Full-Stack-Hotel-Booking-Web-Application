import "../../pages/Hotels/hotels.css";
import Star from "../../components/star/Star";


const Rating = () => {

  return (
    <div className="backgroundItem">
                    <label class="form-group-rating">
                      <input  data-testid = "five" type="checkbox" name="checkbox" />
                      <div>
                        <Star rating={5}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input data-testid = "four" type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={4}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input data-testid = "three" type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={3}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input data-testid = "two" type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={2}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input data-testid = "one" type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={1}></Star>
                      </div>
                    </label>
                  </div>
  );
};

export default Rating;
