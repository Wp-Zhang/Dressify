import './SearchBar.css';

import { Input, Button, Grid, Dropdown, Container } from '@nextui-org/react';

import { useEffect, useState, useCallback } from 'react';

import CategoryDataService from '../../services/category';

const SearchBar = ({ index, filters, setFilters }) => {

    const [keyword, setKeyWord] = useState()
    const [orderBy, setOrderBy] = useState("Order By")
    const [sections, setSections] = useState([])
    const [curSection, setCurSection] = useState("Section")
    const [types, setTypes] = useState([])
    const [curProductType, setCurProductType] = useState("Product Type")


    const updateFilters = () => {
        let new_filters = { ...filters }
        let section, type, by
        if (orderBy !== "Order By") {
            [by] = orderBy
            by = { "Price ↓": "priceDecr", "Price ↑": "priceIncr", "popularity": "popularity" }[by]
        }
        if (curSection !== "Section") {
            [section] = curSection
        }
        if (curProductType !== "Product Type") {
            [type] = curProductType
        }
        new_filters.kw = keyword
        new_filters.section = section
        new_filters.type = type
        new_filters.by = by
        setFilters(new_filters)
    }




    const findByFilters = useCallback(() => {
        updateFilters()
        console.log(filters)
    }, [orderBy, keyword])

    useEffect(() => {
        CategoryDataService.getSections(index)
            .then(response => {
                let new_sections = response.data.map(
                    section => ({ 'key': section, 'name': section })
                )
                setSections(new_sections);
                updateFilters()
            })
    }, [index])

    useEffect(() => {
        const [section] = curSection;
        CategoryDataService.getTypes(index, section)
            .then(response => {
                let new_types = response.data.map(
                    type => ({ 'key': type, 'name': type })
                )
                setTypes(new_types);
                updateFilters()
            })
    }, [curSection])



    return (
        <Container display='flex' justify='center'>
            <Grid.Container className="search-bar" gap={1.9} justify="center">
                <Grid>
                    <Input
                        className="search"
                        clearable
                        bordered
                        // color=""
                        placeholder='Search ...'
                        initialValue=''
                        contentRight={
                            <Button
                                auto
                                color=""
                                rounded
                                css={{ background: "rgb(255,255,255,0)" }}
                                icon={<img src="./icons/search.svg" width={15}></img>}
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
                            selectedKeys={orderBy}
                            onSelectionChange={setOrderBy}
                            css={{ width: "100%" }}
                            disabledKeys={["title"]}
                        >
                            <Dropdown.Item key="title">Order By</Dropdown.Item>
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
                            onSelectionChange={setCurSection}
                            css={{ width: "100%" }}
                            disabledKeys={["title"]}
                            items={[{ "key": "title", "name": "Section" }, ...sections]}
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
                            onSelectionChange={setCurProductType}
                            css={{ width: "100%" }}
                            disabledKeys={["title"]}
                            items={[{ "key": "title", "name": "Section" }, ...types]}
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