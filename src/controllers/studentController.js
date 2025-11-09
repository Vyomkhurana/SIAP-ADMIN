const supabase = require('../utils/supabase');
const { TABLES } = require('../models');

const getAllStudents = async (req, res) => {
    try {
        console.log('Fetching all students...');
        
        const { data, error } = await supabase
            .from(TABLES.STUDENTS)
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch students',
                error: error.message
            });
        }
        
        console.log(`Found ${data.length} students`);
        
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
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

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching student with ID: ${id}`);
        
        const { data, error } = await supabase
            .from(TABLES.STUDENTS)
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(404).json({
                success: false,
                message: 'Student not found',
                error: error.message
            });
        }
        
        console.log(`Found student: ${data.name}`);
        
        return res.status(200).json({
            success: true,
            data: data
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

const createStudent = async (req, res) => {
    try {
        const studentData = req.body;
        
        console.log('Creating new student:', studentData.name);
        
        const requiredFields = [
            'registration_number', 'name', 'email', 
            'program', 'year'
        ];
        
        for (const field of requiredFields) {
            if (!studentData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }
        
        const { data, error } = await supabase
            .from(TABLES.STUDENTS)
            .insert([{
                registration_number: studentData.registration_number,
                name: studentData.name,
                email: studentData.email,
                phone: studentData.phone || null,
                program: studentData.program,
                year: parseInt(studentData.year),
                cgpa: studentData.cgpa ? parseFloat(studentData.cgpa) : null,
                resume_url: studentData.resume_url || null
            }])
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create student',
                error: error.message
            });
        }
        
        console.log(`Student created successfully: ${data[0].name}`);
        
        return res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: data[0]
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

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        console.log(`Updating student ID: ${id}`);
        
        const { data, error } = await supabase
            .from(TABLES.STUDENTS)
            .update(updateData)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update student',
                error: error.message
            });
        }
        
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        console.log(`Student updated successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: data[0]
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

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log(`Deleting student ID: ${id}`);
        
        const { error } = await supabase
            .from(TABLES.STUDENTS)
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete student',
                error: error.message
            });
        }
        
        console.log(`Student deleted successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
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

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
