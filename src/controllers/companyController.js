const supabase = require('../utils/supabase');const supabase = require('../utils/supabase');const supabase = require('../utils/supabase');const supabase = require('../utils/supabase');

const { TABLES } = require('../models');

const { TABLES } = require('../models');

const getAllCompanies = async (req, res) => {

    try {const { TABLES } = require('../models');const { TABLES } = require('../models');

        const { data, error } = await supabase

            .from(TABLES.COMPANIES)const getAllCompanies = async (req, res) => {

            .select('*')

            .order('created_at', { ascending: false });    try {

        

        if (error) {        const { data, error } = await supabase

            return res.status(500).json({

                success: false,            .from(TABLES.COMPANIES)const getAllCompanies = async (req, res) => {const getAllCompanies = async (req, res) => {

                message: 'Failed to fetch companies',

                error: error.message            .select('*')

            });

        }            .order('created_at', { ascending: false });    try {    try {

        

        return res.status(200).json({        

            success: true,

            count: data.length,        if (error) {        const { data, error } = await supabase        const { data, error } = await supabase

            data: data

        });            return res.status(500).json({

    } catch (error) {

        return res.status(500).json({                success: false,            .from(TABLES.COMPANIES)            .from(TABLES.COMPANIES)

            success: false,

            message: 'Server error',                message: 'Failed to fetch companies',

            error: error.message

        });                error: error.message            .select('*')            .select('*')

    }

};            });



const getCompanyById = async (req, res) => {        }            .order('created_at', { ascending: false });            .order('created_at', { ascending: false });

    try {

        const { id } = req.params;        

        const { data, error } = await supabase

            .from(TABLES.COMPANIES)        return res.status(200).json({                

            .select('*')

            .eq('id', id)            success: true,

            .single();

                    count: data.length,        if (error) {        if (error) {

        if (error) {

            return res.status(404).json({            data: data

                success: false,

                message: 'Company not found',        });            return res.status(500).json({            return res.status(500).json({

                error: error.message

            });        

        }

            } catch (error) {                success: false,                success: false,

        return res.status(200).json({

            success: true,        return res.status(500).json({

            data: data

        });            success: false,                message: 'Failed to fetch companies',                message: 'Failed to fetch companies',

    } catch (error) {

        return res.status(500).json({            message: 'Server error',

            success: false,

            message: 'Server error',            error: error.message                error: error.message                error: error.message

            error: error.message

        });        });

    }

};    }            });            });



const createCompany = async (req, res) => {};

    try {

        const companyData = req.body;        }        }

        const requiredFields = [

            'name', 'industry', 'location', 'contact_person',const getCompanyById = async (req, res) => {

            'contact_email', 'contact_phone', 'positions_available',

            'job_roles', 'stipend_min', 'stipend_max', 'duration',    try {                

            'application_deadline'

        ];        const { id } = req.params;

        

        for (const field of requiredFields) {                return res.status(200).json({        return res.status(200).json({

            if (!companyData[field]) {

                return res.status(400).json({        const { data, error } = await supabase

                    success: false,

                    message: `Missing required field: ${field}`            .from(TABLES.COMPANIES)            success: true,            success: true,

                });

            }            .select('*')

        }

                    .eq('id', id)            count: data.length,            count: data.length,

        const { data, error } = await supabase

            .from(TABLES.COMPANIES)            .single();

            .insert([{

                name: companyData.name,                    data: data            data: data

                industry: companyData.industry,

                location: companyData.location,        if (error) {

                website: companyData.website || null,

                contact_person: companyData.contact_person,            return res.status(404).json({        });        });

                contact_email: companyData.contact_email,

                contact_phone: companyData.contact_phone,                success: false,

                positions_available: parseInt(companyData.positions_available),

                job_roles: companyData.job_roles,                message: 'Company not found',                

                stipend_min: parseInt(companyData.stipend_min),

                stipend_max: parseInt(companyData.stipend_max),                error: error.message

                duration: companyData.duration,

                requirements: companyData.requirements || null,            });    } catch (error) {    } catch (error) {

                description: companyData.description || null,

                application_deadline: companyData.application_deadline        }

            }])

            .select();                return res.status(500).json({        return res.status(500).json({

        

        if (error) {        return res.status(200).json({

            return res.status(500).json({

                success: false,            success: true,            success: false,            success: false,

                message: 'Failed to create company',

                error: error.message            data: data

            });

        }        });            message: 'Server error',            message: 'Server error',

        

        return res.status(201).json({        

            success: true,

            message: 'Company created successfully',    } catch (error) {            error: error.message            error: error.message

            data: data[0]

        });        return res.status(500).json({

    } catch (error) {

        return res.status(500).json({            success: false,        });        });

            success: false,

            message: 'Server error',            message: 'Server error',

            error: error.message

        });            error: error.message    }    }

    }

};        });



const updateCompany = async (req, res) => {    }};};

    try {

        const { id } = req.params;};

        const updateData = req.body;

        const { data, error } = await supabase

            .from(TABLES.COMPANIES)

            .update(updateData)const createCompany = async (req, res) => {

            .eq('id', id)

            .select();    try {const getCompanyById = async (req, res) => {/**

        

        if (error) {        const companyData = req.body;

            return res.status(500).json({

                success: false,            try { * GET COMPANY BY ID

                message: 'Failed to update company',

                error: error.message        const requiredFields = [

            });

        }            'name', 'industry', 'location', 'contact_person',        const { id } = req.params; * Fetches a single company's details

        

        if (data.length === 0) {            'contact_email', 'contact_phone', 'positions_available',

            return res.status(404).json({

                success: false,            'job_roles', 'stipend_min', 'stipend_max', 'duration',         * Used when: Admin clicks "View" button on a company

                message: 'Company not found'

            });            'application_deadline'

        }

                ];        const { data, error } = await supabase */

        return res.status(200).json({

            success: true,        

            message: 'Company updated successfully',

            data: data[0]        for (const field of requiredFields) {            .from(TABLES.COMPANIES)const getCompanyById = async (req, res) => {

        });

    } catch (error) {            if (!companyData[field]) {

        return res.status(500).json({

            success: false,                return res.status(400).json({            .select('*')    try {

            message: 'Server error',

            error: error.message                    success: false,

        });

    }                    message: `Missing required field: ${field}`            .eq('id', id)        // Get the ID from URL parameter

};

                });

const deleteCompany = async (req, res) => {

    try {            }            .single();        // Example: /api/companies/123 → id = '123'

        const { id } = req.params;

        const { error } = await supabase        }

            .from(TABLES.COMPANIES)

            .delete()                        const { id } = req.params;

            .eq('id', id);

                const { data, error } = await supabase

        if (error) {

            return res.status(500).json({            .from(TABLES.COMPANIES)        if (error) {        

                success: false,

                message: 'Failed to delete company',            .insert([{

                error: error.message

            });                name: companyData.name,            return res.status(404).json({        console.log(`Fetching company with ID: ${id}`);

        }

                        industry: companyData.industry,

        return res.status(200).json({

            success: true,                location: companyData.location,                success: false,        

            message: 'Company deleted successfully'

        });                website: companyData.website || null,

    } catch (error) {

        return res.status(500).json({                contact_person: companyData.contact_person,                message: 'Company not found',        // .eq() means "equals" - find record where id matches

            success: false,

            message: 'Server error',                contact_email: companyData.contact_email,

            error: error.message

        });                contact_phone: companyData.contact_phone,                error: error.message        // .single() means we expect only one result

    }

};                positions_available: parseInt(companyData.positions_available),



module.exports = {                job_roles: companyData.job_roles,            });        const { data, error } = await supabase

    getAllCompanies,

    getCompanyById,                stipend_min: parseInt(companyData.stipend_min),

    createCompany,

    updateCompany,                stipend_max: parseInt(companyData.stipend_max),        }            .from(TABLES.COMPANIES)

    deleteCompany

};                duration: companyData.duration,


                requirements: companyData.requirements || null,                    .select('*')

                description: companyData.description || null,

                application_deadline: companyData.application_deadline        return res.status(200).json({            .eq('id', id)

            }])

            .select();            success: true,            .single();

        

        if (error) {            data: data        

            return res.status(500).json({

                success: false,        });        if (error) {

                message: 'Failed to create company',

                error: error.message                    console.error('Database error:', error);

            });

        }    } catch (error) {            return res.status(404).json({

        

        return res.status(201).json({        return res.status(500).json({                success: false,

            success: true,

            message: 'Company created successfully',            success: false,                message: 'Company not found',

            data: data[0]

        });            message: 'Server error',                error: error.message

        

    } catch (error) {            error: error.message            });

        return res.status(500).json({

            success: false,        });        }

            message: 'Server error',

            error: error.message    }        

        });

    }};        console.log(`Found company: ${data.name}`);

};

        

const updateCompany = async (req, res) => {

    try {const createCompany = async (req, res) => {        return res.status(200).json({

        const { id } = req.params;

        const updateData = req.body;    try {            success: true,

        

        const { data, error } = await supabase        const companyData = req.body;            data: data

            .from(TABLES.COMPANIES)

            .update(updateData)                });

            .eq('id', id)

            .select();        const requiredFields = [        

        

        if (error) {            'name', 'industry', 'location', 'contact_person',    } catch (error) {

            return res.status(500).json({

                success: false,            'contact_email', 'contact_phone', 'positions_available',        console.error('Server error:', error);

                message: 'Failed to update company',

                error: error.message            'job_roles', 'stipend_min', 'stipend_max', 'duration',        return res.status(500).json({

            });

        }            'application_deadline'            success: false,

        

        if (data.length === 0) {        ];            message: 'Server error',

            return res.status(404).json({

                success: false,                    error: error.message

                message: 'Company not found'

            });        for (const field of requiredFields) {        });

        }

                    if (!companyData[field]) {    }

        return res.status(200).json({

            success: true,                return res.status(400).json({};

            message: 'Company updated successfully',

            data: data[0]                    success: false,

        });

                            message: `Missing required field: ${field}`/**

    } catch (error) {

        return res.status(500).json({                }); * CREATE COMPANY

            success: false,

            message: 'Server error',            } * Adds a new company to database

            error: error.message

        });        } * Used when: Admin submits "Add Company" form

    }

};         */



const deleteCompany = async (req, res) => {        const { data, error } = await supabaseconst createCompany = async (req, res) => {

    try {

        const { id } = req.params;            .from(TABLES.COMPANIES)    try {

        

        const { error } = await supabase            .insert([{        // Get data from request body (what frontend sent)

            .from(TABLES.COMPANIES)

            .delete()                name: companyData.name,        const companyData = req.body;

            .eq('id', id);

                        industry: companyData.industry,        

        if (error) {

            return res.status(500).json({                location: companyData.location,        console.log('Creating new company:', companyData.name);

                success: false,

                message: 'Failed to delete company',                website: companyData.website || null,        

                error: error.message

            });                contact_person: companyData.contact_person,        // Validate required fields

        }

                        contact_email: companyData.contact_email,        const requiredFields = [

        return res.status(200).json({

            success: true,                contact_phone: companyData.contact_phone,            'name', 'industry', 'location', 'contact_person',

            message: 'Company deleted successfully'

        });                positions_available: parseInt(companyData.positions_available),            'contact_email', 'contact_phone', 'positions_available',

        

    } catch (error) {                job_roles: companyData.job_roles,            'job_roles', 'stipend_min', 'stipend_max', 'duration',

        return res.status(500).json({

            success: false,                stipend_min: parseInt(companyData.stipend_min),            'application_deadline'

            message: 'Server error',

            error: error.message                stipend_max: parseInt(companyData.stipend_max),        ];

        });

    }                duration: companyData.duration,        

};

                requirements: companyData.requirements || null,        // Check if any required field is missing

module.exports = {

    getAllCompanies,                description: companyData.description || null,        for (const field of requiredFields) {

    getCompanyById,

    createCompany,                application_deadline: companyData.application_deadline            if (!companyData[field]) {

    updateCompany,

    deleteCompany            }])                return res.status(400).json({

};

            .select();                    success: false,

                            message: `Missing required field: ${field}`

        if (error) {                });

            return res.status(500).json({            }

                success: false,        }

                message: 'Failed to create company',        

                error: error.message        // Insert into database

            });        const { data, error } = await supabase

        }            .from(TABLES.COMPANIES)

                    .insert([{

        return res.status(201).json({                name: companyData.name,

            success: true,                industry: companyData.industry,

            message: 'Company created successfully',                location: companyData.location,

            data: data[0]                website: companyData.website || null,

        });                contact_person: companyData.contact_person,

                        contact_email: companyData.contact_email,

    } catch (error) {                contact_phone: companyData.contact_phone,

        return res.status(500).json({                positions_available: parseInt(companyData.positions_available),

            success: false,                job_roles: companyData.job_roles,

            message: 'Server error',                stipend_min: parseInt(companyData.stipend_min),

            error: error.message                stipend_max: parseInt(companyData.stipend_max),

        });                duration: companyData.duration,

    }                requirements: companyData.requirements || null,

};                description: companyData.description || null,

                application_deadline: companyData.application_deadline

const updateCompany = async (req, res) => {            }])

    try {            .select(); // Return the created record

        const { id } = req.params;        

        const updateData = req.body;        if (error) {

                    console.error('Database error:', error);

        const { data, error } = await supabase            return res.status(500).json({

            .from(TABLES.COMPANIES)                success: false,

            .update(updateData)                message: 'Failed to create company',

            .eq('id', id)                error: error.message

            .select();            });

                }

        if (error) {        

            return res.status(500).json({        console.log(`Company created successfully: ${data[0].name}`);

                success: false,        

                message: 'Failed to update company',        return res.status(201).json({

                error: error.message            success: true,

            });            message: 'Company created successfully',

        }            data: data[0]

                });

        if (data.length === 0) {        

            return res.status(404).json({    } catch (error) {

                success: false,        console.error('Server error:', error);

                message: 'Company not found'        return res.status(500).json({

            });            success: false,

        }            message: 'Server error',

                    error: error.message

        return res.status(200).json({        });

            success: true,    }

            message: 'Company updated successfully',};

            data: data[0]

        });/**

         * UPDATE COMPANY

    } catch (error) { * Updates an existing company's details

        return res.status(500).json({ * Used when: Admin edits company information

            success: false, */

            message: 'Server error',const updateCompany = async (req, res) => {

            error: error.message    try {

        });        const { id } = req.params;

    }        const updateData = req.body;

};        

        console.log(`Updating company ID: ${id}`);

const deleteCompany = async (req, res) => {        

    try {        // Update the record

        const { id } = req.params;        const { data, error } = await supabase

                    .from(TABLES.COMPANIES)

        const { error } = await supabase            .update(updateData)

            .from(TABLES.COMPANIES)            .eq('id', id)

            .delete()            .select();

            .eq('id', id);        

                if (error) {

        if (error) {            console.error('Database error:', error);

            return res.status(500).json({            return res.status(500).json({

                success: false,                success: false,

                message: 'Failed to delete company',                message: 'Failed to update company',

                error: error.message                error: error.message

            });            });

        }        }

                

        return res.status(200).json({        if (data.length === 0) {

            success: true,            return res.status(404).json({

            message: 'Company deleted successfully'                success: false,

        });                message: 'Company not found'

                    });

    } catch (error) {        }

        return res.status(500).json({        

            success: false,        console.log(`Company updated successfully`);

            message: 'Server error',        

            error: error.message        return res.status(200).json({

        });            success: true,

    }            message: 'Company updated successfully',

};            data: data[0]

        });

module.exports = {        

    getAllCompanies,    } catch (error) {

    getCompanyById,        console.error('Server error:', error);

    createCompany,        return res.status(500).json({

    updateCompany,            success: false,

    deleteCompany            message: 'Server error',

};            error: error.message

        });
    }
};

/**
 * DELETE COMPANY
 * Removes a company from database
 * Used when: Admin clicks "Delete" button
 */
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log(`Deleting company ID: ${id}`);
        
        // Delete the record
        const { error } = await supabase
            .from(TABLES.COMPANIES)
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete company',
                error: error.message
            });
        }
        
        console.log(`Company deleted successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Company deleted successfully'
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Export all functions so routes can use them
module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
