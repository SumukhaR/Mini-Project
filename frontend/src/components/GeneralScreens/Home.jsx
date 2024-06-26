import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonQuestion from "../Skeletons/SkeletonQuestion"
import CardQuestion from "../QuestionScreens/CardQuestion"
import NoQuestion from "../QuestionScreens/NoQuestion"
import Pagination from "./Pagination"
import "../../css/Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const search = useLocation().search
    const searchKey = new URLSearchParams(search).get('search')
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true)
            try{
                const { data } = await axios.get(`http://localhost:5001/question/getAllQuestions?search=${searchKey || ""}&page=${page}`)
                //console.log(data.pages + " " + "debugging" + type(data.data) + " " + data.data)
                //console.log()
                if(searchKey){
                    navigate({
                        pathname: '/',
                        search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`

                    })
                }
                else{
                    navigate({
                        pathname:'/',
                        search: `${page > 1 ? `page=${page}` : ""}`
                    })
                }
                setQuestions(data.data)
                setPages(data.pages)
                //console.log(data.pages)
                setLoading(false)
            }
            catch(error){
                console.log(error)
                setLoading(true)
            }
        }
        getQuestions()
    }, [setLoading, search, page, navigate])
    //console.log(searchKey)
    useEffect(() => {
        setPage(1)
    }, [searchKey])
    //console.log(questions.length + " " + questions)
    //console.log(page + " " + pages)
    //console.log("home")
    return (
        <div className="Inclusive-home-page">
      {loading ?

        <div className="skeleton_emp">
          {
            [...Array(6)].map(() => {
              return (
                // theme dark :> default : light
                <SkeletonQuestion key={uuidv4()} />
              )
            })}
        </div>

        :
        <div>
          <div className="question-card-wrapper">
            {questions?.length !== 0 ?
              questions.map((question) => {
                return (
                  <CardQuestion key={uuidv4()} question={question} />
                )
              }) : <NoQuestion />
            }
            <img className="bg-planet-svg" src="planet.svg" alt="planet" />
            <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" />

          </div>

          <Pagination page={page} pages={pages} changePage={setPage} />

        </div>

      }
      <br />
    </div>

    )
}

export default Home