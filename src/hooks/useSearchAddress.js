import { OpenStreetMapProvider } from "leaflet-geosearch"
import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce"

export const useSearchAddress = (_searchTerm, _addCurrentPos = true) => {
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [currentPos, setCurrentPos] = useState(null)
    // const debounceSearchTerm = useDebounce(_searchTerm, 1000);
    const provider = new OpenStreetMapProvider();

    useEffect(() => {
        addCurrentLocation()
    },[])
    
    useEffect(() => {
        if (_searchTerm) {
            setIsSearching(true);
            searchAddress(_searchTerm)
        }
        else {
            setIsSearching(false);
            // setResults([])
            updateResults([])
        }
    }, [_searchTerm]);

    const addCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let temp = {
                    label: "Your current location",
                    raw: {
                        osm_type: "way",
                        type: "",
                        place_id: 0
                    },
                    x: pos.coords.latitude,
                    y: pos.coords.longitude
                }
                setCurrentPos(temp)
            },
            (err) => {
                console.log(err);
                alert('there problem with the position');
            }
        );
    };

    const updateResults = (_ar) => {
        if(_addCurrentPos && currentPos){
            setResults([currentPos, ..._ar])
        }
        else{
            setResults(_ar)
        }
    }


    const searchAddress = async (_val) => {
        console.log("work");
        let result = await provider.search({ query: _val });
        result = result.filter((item, i) => item.raw.osm_type === 'way' && item.raw.type !== 'town');
        //omit the unimortent details form the label
        result.forEach((item, i) => {
            item.label = item.label.split(',');
            item.label.splice(-4);
        })
        if (result.length > 0) {
            setIsSearching(false);
            // setResults(result);
            updateResults(result);
            console.log(result);
        }
    }
    return [results, setResults, isSearching];
}