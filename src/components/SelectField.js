import React from "react";

const SelectField = ({ type, title, placeholder, inputHandler, errorMsg ,name ,options,superCat}) => {
  // console.log(superCat)
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text font-semibold">{title}</span>
        <span className="label-text-alt text-error">{errorMsg}</span>
      </div>
      <select className="select select-bordered w-full max-w-xs" name={name} onChange={inputHandler}>
        <option disabled selected>Select {title}</option>
              {
                superCat&& (
                  options                    
                  .filter((subcategory) => subcategory.cat_id == superCat)
                    .map((cat, ind) => {
                      // console.log("superCat "+ superCat);
                      return (
                        <option key={ind} value={cat.id}>
                          {cat.name}
                        </option>
                      );
                    })
                )
              }
              {
                !superCat&&
                (
                  options.map((cat, ind) => {
                    // console.log(cat)
                    return(
                    <option key={ind} value={cat.id}>
                      {cat.name}
                    </option>
  
                    )
                    })
                  // options.map((i,index)=>(
                  //     <option>{i}</option>
                  // ))
                )
               
                
              }
            </select>
      {/* <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full "
        onChange={inputHandler}
      /> */}
      <div className="label">
        {/* <span className="label-text-alt ">{errorMsg}</span> */}
        {/* <span className="label-text-alt">Bottom Right label</span> */}
      </div>
    </label>
  );
};

export default SelectField;