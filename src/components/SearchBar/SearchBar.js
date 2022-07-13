import './SearchBar.css';

import { Input, Button, Grid, Dropdown, Container } from '@nextui-org/react';

import { useEffect, useState } from 'react';

import CategoryDataService from '../../services/category';

const SearchBar = ({ index, setFilters }) => {
    const [keyword, setKeyWord] = useState()
    const [orderBy, setOrderBy] = useState(new Set(["Popuarity"]))
    const [sections, setSections] = useState([])
    const [curSection, setCurSection] = useState(new Set(["Section"]))
    const [types, setTypes] = useState([])
    const [curProductType, setCurProductType] = useState(new Set(["Product Type"]))

    useEffect(() => {
        let new_filters = {}

        let [by] = orderBy
        let [section] = curSection
        let [type] = curProductType

        if (by !== "Order By") {
            const lookup_dict = { "Price ↓": "priceDecr", "Price ↑": "priceIncr", "Popularity": "popularity" }
            by = lookup_dict[by]
        } else {
            by = undefined
        }
        if (section === "Section") {
            section = undefined
        }
        if (type === "Product Type") {
            type = undefined
        }
        new_filters.index = index
        new_filters.kw = keyword
        new_filters.section = section
        new_filters.garmentGroup = type
        new_filters.by = by

        // console.log("New filters:", new_filters)
        setFilters(new_filters)
    }, [index, keyword, orderBy, curSection, curProductType, setFilters])


    useEffect(() => {
        // console.log("Search bar:", index)
        CategoryDataService.getSections(index)
            .then(response => {
                let new_sections = response.data.map(
                    section => ({ 'key': section, 'name': section })
                )
                setSections(new_sections);
                setOrderBy(new Set(["Popularity"]));
                setCurSection(new Set(["Section"]));
                setCurProductType(new Set(["Product Type"]));
            })
    }, [index])

    useEffect(() => {
        const [section] = curSection;
        if (curSection !== "Section") {
            // console.log("Cur section:", section)
            CategoryDataService.getTypes(index, section)
                .then(response => {
                    let new_types = response.data.map(
                        type => ({ 'key': type, 'name': type })
                    )
                    setTypes(new_types);
                    setCurProductType(new Set(["Product Type"]));
                })
        }
    }, [curSection, index])

    return (
        <Container display='flex' justify='center'>
            <Grid.Container className="search-bar" gap={1.9} justify="center">
                <Grid>
                    <Input
                        className="search"
                        // bordered
                        status="default"
                        placeholder='Search ...'
                        initialValue=''
                        id="search"
                        aria-label='search-input'
                        type="search"
                        contentRight={
                            <Button
                                auto
                                color=""
                                rounded
                                css={{ background: "rgb(255,255,255,0)" }}
                                icon={<img src="./icons/search.svg" width={15} alt="search-button"></img>}
                                onClick={(e) => { setKeyWord(e.view.document.getElementById("search").value) }}
                            />
                        }
                    >
                    </Input>
                </Grid>

                <Grid>
                    <Dropdown>
                        <Dropdown.Button bordered ripple color="" className="filter">{orderBy}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label='order'
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={orderBy}
                            onSelectionChange={setOrderBy}
                            css={{ width: "100%" }}
                            disabledKeys={["Order By"]}
                        >
                            <Dropdown.Item key="Order By">Order By</Dropdown.Item>
                            <Dropdown.Item key="Popularity">Popularity</Dropdown.Item>
                            <Dropdown.Item key="Price ↓">Price ↓</Dropdown.Item>
                            <Dropdown.Item key="Price ↑">Price ↑</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>

                <Grid>
                    <Dropdown>
                        <Dropdown.Button bordered ripple color="" className="filter">{curSection}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label='section'
                            selectionMode="single"
                            selectedKeys={curSection}
                            disallowEmptySelection
                            onSelectionChange={setCurSection}
                            css={{ width: "100%" }}
                            // disabledKeys={["Section"]}
                            items={[{ "key": "Section", "name": "All" }, ...sections]}
                        >
                            {item => (<Dropdown.Item key={item.key} > {item.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>


                <Grid>
                    <Dropdown>
                        <Dropdown.Button bordered ripple color="" className="filter">{curProductType}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="type"
                            selectionMode="single"
                            selectedKeys={curProductType}
                            disallowEmptySelection
                            onSelectionChange={setCurProductType}
                            css={{ width: "100%" }}
                            // disabledKeys={["Product Type"]}
                            items={[{ "key": "Product Type", "name": "All" }, ...types]}
                        >
                            {item => (<Dropdown.Item key={item.key} > {item.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
            </Grid.Container>
        </Container >
    )

}

export default SearchBar