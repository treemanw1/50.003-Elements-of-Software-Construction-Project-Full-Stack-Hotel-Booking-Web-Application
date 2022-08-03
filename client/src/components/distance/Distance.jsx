import "../../pages/list/list.css";


const Distance = () => {

  return (
    <div className="backgroundItem">
                    <label class="form-group">
                      <input data-testid = "inside-center" type="checkbox" name="checkbox" />
                      Inside city center
                    </label>

                    <label class="form-group">
                      <input data-testid = "0-2center" type="checkbox" name="checkbox-checked" />
                      less than 2 km to center
                    </label>

                    <label class="form-group">
                      <input data-testid = "2-5center" type="checkbox" name="checkbox-checked" />
                      2-5 km to center
                    </label>

                    <label class="form-group">
                      <input data-testid = "5-10center" type="checkbox" name="checkbox-checked" />
                      5-10 km to center
                    </label>

                    <label class="form-group">
                      <input data-testid = "10+center" type="checkbox" name="checkbox-checked" />
                      more than 10 km to center
                    </label>
                  </div>
  );
};

export default Distance;
